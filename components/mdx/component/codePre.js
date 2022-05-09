import React from "react"
import Highlight, { defaultProps } from "prism-react-renderer"
import rangeParser from "parse-numeric-range"
import theme from '@config/codeTheme';
import CodeSnippet from "@components/codeLive/codeSnippet";

import { Copy } from 'react-feather';

import ReactPlayground from "@components/playground/reactPlayground";

const calculateLinesToHighlight = raw => {
  const lineNumbers = rangeParser(raw)
  if (lineNumbers) {
    return index => lineNumbers.includes(index + 1)
  } else {
    return () => false
  }
}

const copyToClipboard = str => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(str).then(
      function () {
        console.log("Copying to clipboard was successful!")
      },
      function (err) {
        console.error("Could not copy text: ", err)
      }
    )
  } else if (window.clipboardData) {
    // Internet Explorer
    window.clipboardData.setData("Text", str)
  }
}

const CodePre = (props) => {
  const [isCopied, setIsCopied] = React.useState(false);
  const childProps = props.children || {};
  const { className = '', children = '', live = false, file = '', light = '' } = childProps.props || {};
  const code = children.trim();
  const language = className.replace(/language-/, "");
  const highlights = calculateLinesToHighlight(light || "");

  if (live && language == 'jsx') {
    return (
      <ReactPlayground js={code} language={language}/>
    );
  }

  return (
    <div
      className="rounded-lg my-10 pl-3 pb-4 shadow-3xl bg-playground-bg md:-mx-6"
    >
      <div className="flex relative pb-4">
        <div
          className=" mx-1 px-2 uppercase rounded-bl-md rounded-br-md font-bold text-center flex justify-center items-center"
          style={{
            background: "var(--fg-inactive)",
          }}
        >{`${language}`}</div>
        <div
          className="flex justify-center items-center italic"
          style={{
            color: "var(--fg-active)",
          }}
        >
          {file && `${file}`}
        </div>
        <div style={{ flexGrow: "1" }}></div>
        <button
          className="mr-5 mt-2 py-2 px-3 border-none rounded-lg cursor-pointer text-sm font-SourceCode leading-4"
          onClick={() => {
            copyToClipboard(code)
            setIsCopied(true)
            setTimeout(() => setIsCopied(false), 1000)
          }}
        >
          {isCopied ? "🎉 Copied!" :  <Copy size={20} />}
        </button>
      </div>
      <div
      className=" overflow-auto rounded-lg "
        style={{
          background: "var(--bg-default)",
        }}
      >
        <Highlight
          {...defaultProps}
          code={code}
          language={language}
          theme={theme}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className='bg-transparent min-w-full text-pre'
            >
              {tokens.map((line, i) => (
                <div
                  key={i}
                  {...getLineProps({ line, key: i })}
                  style={{
                    background: highlights(i) ? "#00f5c426" : "transparent",
                    display: "block",
                  }}
                >
                  <span className="inline-block mr-4 w-5 text-right">{i + 1}</span>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  )
}

export default CodePre
