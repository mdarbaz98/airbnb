import React from "react";

export const AirbnbCardSkeleton = () => {
    return Array(18).fill(
      <div className="max-w-sm overflow-hidden">
        {/* Image skeleton */}
        <div className="animate-pulse rounded-2xl bg-gray-300 h-48 w-full"></div>
  
        {/* Card body */}
        <div className="py-2">
          {/* Title skeleton */}
          <div className="animate-pulse rounded bg-gray-300 h-4 w-2/4 mb-2"></div>
  
          {/* Description skeleton */}
          <div className="animate-pulse rounded bg-gray-300 h-4 w-2/5 mb-4"></div>
  
          {/* Price skeleton */}
          <div className="animate-pulse rounded bg-gray-300 h-4 w-1/3"></div>
        </div>
      </div>
    );
  };