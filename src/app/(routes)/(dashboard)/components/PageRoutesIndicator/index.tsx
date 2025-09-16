import React from 'react';

function PageRoutesIndicator({ pageRoutes, pageTitle }: { pageRoutes: string; pageTitle: string }) {
  return (
    <section className="relative page-main-content-header flex flex-col justify-center">
      <div className="text-[10px]">{pageRoutes}</div>
      <div className="poppins text-[16px] font-semibold">{pageTitle}</div>
    </section>
  );
}

export default PageRoutesIndicator;
