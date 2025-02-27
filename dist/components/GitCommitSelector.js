import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
const GitCommitSelector = () => {
    const [commits, setCommits] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        fetch("/api/commits")
            .then((res) => res.json())
            .then((data) => setCommits(data))
            .catch(console.error);
    }, []);
    const handleCommitSelect = async (hash) => {
        setLoading(true);
        const response = await fetch(`/api/checkout?commitHash=${hash}`);
        const data = await response.json();
        if (data.url) {
            window.open(data.url, "_blank");
        }
        setLoading(false);
    };
    return (_jsxs("div", { className: "fixed bottom-5 right-5 bg-white p-3 shadow-lg rounded-lg", children: [_jsx("button", { className: "bg-gray-800 text-white px-4 py-2 rounded", onClick: () => setLoading((prev) => !prev), children: loading ? "Close" : "View Commits" }), loading && (_jsx("ul", { className: "mt-2 max-h-60 overflow-y-auto bg-white border rounded-lg shadow-md", children: commits.map(({ hash, message }) => (_jsxs("li", { className: "cursor-pointer hover:bg-gray-200 p-2", onClick: () => handleCommitSelect(hash), children: [_jsx("strong", { children: hash }), ": ", message] }, hash))) }))] }));
};
export default GitCommitSelector;
