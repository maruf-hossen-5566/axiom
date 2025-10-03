import React from 'react';

const PageHeader = ({title = "Page title", subtitle = "Page subtitle"}) => {
    return (
        <div className="w-full py-16 flex flex-col items-start justify-start">
            <h2 className="text-2xl font-semibold">{title}</h2>
            <p className="text-muted-foreground">{subtitle}</p>
        </div>
    );
};

export default PageHeader;