import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { bundleMDX } from "mdx-bundler";
import { remarkTocHeadings, remarkCodeTitles } from '@lib/remark';
import { rehypeMetaAttribute } from '@lib/rehype'

import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeCodeTitles from "rehype-code-titles";

import readingTime from "reading-time";

import getAllFiles from './tool/getAllFiles';

export const ROOT = process.cwd();
export const POSTS_PATH = path.join(ROOT, "posts");
export const POSTS_COMPONENTS = path.join(ROOT, "components");


export const formatSlug = slug => {
  return slug.replace(/\.(mdx|md)/, '')
}

export const getSourceOfFile = (fileName) => {
  return fs.readFileSync(path.join(POSTS_PATH, fileName), 'utf-8');
};

export const getAllPosts = async () => {

  const files = getAllFiles(POSTS_PATH);
  const allPosts = [];

  for (const file of files) {
    const fileName = file.slice(POSTS_PATH.length + 1).replace(/\\/g, '/');
    const source = getSourceOfFile(fileName);
    const { data: frontmatter } = matter(source);
    if (!frontmatter.draft) {
      allPosts.push({
        ...frontmatter,
        slug: formatSlug(fileName),
        date: frontmatter.date ? new Date(frontmatter.date).toISOString() : null,
      })
    }
  }
  allPosts.sort((a, b) => (a.date > b.date ? -1 : 1))
  return allPosts

};

export const getSinglePost = async (slug) => {

  const source = getSourceOfFile(slug + ".mdx")
  const toc = [];

  // https://github.com/kentcdodds/mdx-bundler#nextjs-esbuild-enoent
  if (process.platform === 'win32') {
    process.env.ESBUILD_BINARY_PATH = path.join(ROOT, 'node_modules', 'esbuild', 'esbuild.exe')
  } else {
    process.env.ESBUILD_BINARY_PATH = path.join(ROOT, 'node_modules', 'esbuild', 'bin', 'esbuild')
  }

  const { code, frontmatter } = await bundleMDX({
    source,
    cwd: POSTS_COMPONENTS,
    mdxOptions: (options, frontmatter) => {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        remarkGfm,
        [remarkTocHeadings, { exportRef: toc }],

      ]
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeSlug,
        rehypeAutolinkHeadings,
        rehypeMetaAttribute,

      ]
      return options
    },
    esbuildOptions: (options) => {
      options.loader = {
        ...options.loader,
        '.js': 'jsx',
      }
      return options
    },
  });

  
  return {
    frontmatter: {
      ...frontmatter,
      readTime: readingTime(code),
      wordCount: code.split(/\s+/gu).length
    },
    toc,
    code,
  };
};