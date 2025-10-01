const SkeletonLoader = ({ 
  width = 'w-full', 
  height = 'h-4', 
  className = '',
  variant = 'rectangular'
}) => {
  const variantClasses = {
    rectangular: 'rounded',
    circular: 'rounded-full',
    text: 'rounded h-4'
  };

  return (
    <div 
      className={`skeleton ${width} ${height} ${variantClasses[variant]} ${className}`}
    ></div>
  );
};

// Pre-built skeleton components
export const ProductCardSkeleton = () => (
  <div className="card p-4 space-y-4">
    <SkeletonLoader height="h-48" variant="rectangular" />
    <SkeletonLoader height="h-6" width="w-3/4" />
    <SkeletonLoader height="h-4" width="w-1/2" />
    <SkeletonLoader height="h-8" width="w-full" />
  </div>
);

export const ProductDetailSkeleton = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <div className="space-y-4">
      <SkeletonLoader height="h-96" />
      <div className="grid grid-cols-4 gap-2">
        {[...Array(4)].map((_, i) => (
          <SkeletonLoader key={i} height="h-20" />
        ))}
      </div>
    </div>
    <div className="space-y-6">
      <SkeletonLoader height="h-8" width="w-3/4" />
      <SkeletonLoader height="h-6" width="w-1/2" />
      <SkeletonLoader height="h-20" />
      <SkeletonLoader height="h-12" width="w-1/3" />
      <SkeletonLoader height="h-12" />
    </div>
  </div>
);

export default SkeletonLoader;
