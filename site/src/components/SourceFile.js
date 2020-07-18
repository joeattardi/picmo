import escape from 'escape-html';
import React from 'react';

export default function SourceFile({ src }) {
  return (
    <pre>
      <code
        className="language-javascript"
        dangerouslySetInnerHTML={{ __html: escape(src) }}
      />
    </pre>
  );
}
