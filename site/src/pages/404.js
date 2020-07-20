import React from 'react';

import DocLayout from '../components/DocLayout';

export default function NotFoundPage() {
  return (
    <DocLayout>
      <h1>Not Found</h1>
      <div style={{fontSize: '3rem'}}>😔</div>
      <p>Sorry, the page you requested could not be found.</p>
    </DocLayout>
  );
}
