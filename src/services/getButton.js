import React from "react";
export default function getButton(link, label, cName) {
  let hrefvalue = "";
  if (link) {
    if (link.startsWith("http")) hrefvalue = link;
    else if (link.startsWith("tt"))
      hrefvalue = `https://www.imdb.com/title/${link}`;
    else hrefvalue = `https://www.imdb.com/name/${link}`;
    return (
      <a
        href={hrefvalue}
        className="button"
        target="_blank"
        rel="noopener noreferrer"
      >
        {label} <i className={cName} />
      </a>
    );
  }
}
