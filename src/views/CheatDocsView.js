import "./CheatDocsView.css";
import { Icon } from "@iconify/react";
import docsData from "./DocsData";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coy } from "react-syntax-highlighter/dist/esm/styles/prism";

function CopyButton({ content }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(content);
        setCopied(true);
        setTimeout(() => setCopied(false), 1000); // Reset after 1 second
    };

    return (
        <button
            onClick={handleCopy}
            style={{
                position: "absolute",
                top: "5px",
                right: "5px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
            }}
        >
            <Icon 
                icon={copied ? "lucide:check" : "lucide:copy"} 
                style={{ fontSize: "18px", color: copied ? "green" : "#666" }} 
            />
        </button>
    );
}

export default function CheatDocsView() {
    const [activeItem, setActiveItem] = useState(docsData[0].items[0]); // First item of the first category
    const [isEditing, setIsEditing] = useState(false);
    const [markdownContent, setMarkdownContent] = useState(activeItem.content);
    const [hasChanges, setHasChanges] = useState(false);

    const handleSave = () => {
        activeItem.content = markdownContent;
        setIsEditing(false);
        setHasChanges(false);
    };

    const handleCopy = () => {
        const rawMarkdown = markdownContent.replace(/\n/g, "\\n").replace(/"/g, "\\\"");
        navigator.clipboard.writeText(rawMarkdown);
    };

    return (
        <main style={{ padding: "20px" }}>
            <div className="docs-container">
                <div className="docs-sidebar">
                    {docsData.map((section) => (
                        <div key={section.section}>
                            <div className="docs-nav-section-title">{section.section}</div>
                            <ul className="docs-nav-list">
                                {section.items.map((item) => (
                                    <li
                                        className={`docs-nav-item ${item.title === activeItem.title ? "active" : ""}`}
                                        key={item.title}
                                        onClick={() => {
                                            setActiveItem(item);
                                            setMarkdownContent(item.content);
                                            setIsEditing(false);
                                            setHasChanges(false);
                                        }}
                                    >
                                        <Icon
                                            icon={item.icon}
                                            style={{ fontSize: "18px", color: "currentColor" }}
                                        />
                                        {item.title}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="docs-content">
                    <div className="docs-heading">
                        {activeItem.title}
                        <button
                            className="edit-button"
                            onClick={() => setIsEditing(!isEditing)}
                        >
                            <Icon icon="lucide:pencil" style={{ fontSize: "18px", color: "currentColor" }} />
                        </button>
                        {hasChanges && (
                            <button
                                className="edit-button"
                                onClick={handleSave}
                            >
                                <Icon icon="lucide:check" style={{ fontSize: "18px", color: "currentColor" }} />
                            </button>
                        )}
                        {hasChanges && (
                            <button
                                className="edit-button"
                                onClick={handleCopy}
                            >
                                <Icon icon="lucide:copy" style={{ fontSize: "18px", color: "currentColor" }} />
                            </button>
                        )}
                    </div>
                    {isEditing ? (
                        <div className="split-view">
                            <textarea
                                className="markdown-editor"
                                value={markdownContent}
                                onChange={(e) => {
                                    setMarkdownContent(e.target.value);
                                    setHasChanges(true);
                                }}
                            />
                            <div className="markdown-preview">
                                <ReactMarkdown
                                    components={{
                                        code({ node, inline, className, children, ...props }) {
                                            const match = /language-(\w+)/.exec(className || "");
                                            return !inline && match ? (
                                                <SyntaxHighlighter style={coy} language={match[1]} PreTag="div" {...props}>
                                                    {String(children).replace(/\n$/, "")}
                                                </SyntaxHighlighter>
                                            ) : (
                                                <code className={className} {...props}>
                                                    {children}
                                                </code>
                                            );
                                        },
                                    }}
                                >
                                    {markdownContent}
                                </ReactMarkdown>
                            </div>
                        </div>
                    ) : (
                        <ReactMarkdown
                            components={{
                                code({ node, inline, className, children, ...props }) {
                                    const match = /language-(\w+)/.exec(className || "");
                                    const codeContent = String(children).replace(/\n$/, "");

                                    return !inline && match ? (
                                        <div style={{ position: "relative" }}>
                                            <SyntaxHighlighter style={coy} language={match[1]} PreTag="div" {...props}>
                                                {codeContent}
                                            </SyntaxHighlighter>
                                            <CopyButton content={codeContent} />
                                        </div>
                                    ) : (
                                        <code className={className} {...props}>
                                            {children}
                                        </code>
                                    );
                                },
                            }}
                        >
                            {activeItem.content}
                        </ReactMarkdown>
                    )}
                </div>
            </div>
        </main>
    );
}