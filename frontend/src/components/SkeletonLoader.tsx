import { cn } from "@/lib/utils";

// Deep space shimmer skeleton
const SkeletonBlock = ({ className }: { className?: string }) => (
  <div
    className={cn("rounded-lg relative overflow-hidden", className)}
    style={{
      background: "linear-gradient(135deg, rgba(99,102,241,0.06) 0%, rgba(6,182,212,0.03) 100%)",
    }}
  >
    <div
      className="absolute inset-0 animate-shimmer-sweep"
      style={{
        background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)",
      }}
    />
  </div>
);

// Glass card skeleton
export const CardSkeleton = ({ className }: { className?: string }) => (
  <div className={cn("p-5 rounded-2xl glass-panel space-y-3", className)}>
    <SkeletonBlock className="h-4 w-1/3" />
    <SkeletonBlock className="h-3 w-full" />
    <SkeletonBlock className="h-3 w-4/5" />
    <SkeletonBlock className="h-3 w-2/3" />
  </div>
);

// Stats card skeleton
export const StatCardSkeleton = () => (
  <div className="p-5 rounded-2xl glass-panel space-y-3">
    <div className="flex items-center justify-between">
      <SkeletonBlock className="h-8 w-8 rounded-xl" />
    </div>
    <SkeletonBlock className="h-8 w-14" />
    <SkeletonBlock className="h-3 w-20" />
  </div>
);

// Resume upload skeleton
export const ResumeUploadSkeleton = () => (
  <div className="rounded-3xl glass-panel overflow-hidden">
    <div className="h-20 bg-gradient-to-r from-nebula/20 to-cyan/20" />
    <div className="p-6 space-y-5">
      <div className="h-40 rounded-2xl border-2 border-dashed border-white/8 flex items-center justify-center">
        <SkeletonBlock className="h-12 w-12 rounded-full" />
      </div>
      <SkeletonBlock className="h-11 w-full rounded-full" />
    </div>
  </div>
);

// ATS Score skeleton
export const ATSSkeleton = () => (
  <div className="p-6 rounded-3xl glass-panel space-y-6">
    <div className="flex items-center justify-between">
      <div className="space-y-2">
        <SkeletonBlock className="h-5 w-32" />
        <SkeletonBlock className="h-3 w-48" />
      </div>
      <SkeletonBlock className="h-16 w-16 rounded-full" />
    </div>
    <div className="space-y-3">
      {[80, 65, 90, 45, 75].map((w, i) => (
        <div key={i} className="space-y-1.5">
          <div className="flex justify-between">
            <SkeletonBlock className="h-3 w-28" />
            <SkeletonBlock className="h-3 w-8" />
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
            <div
              className="h-full rounded-full"
              style={{
                width: `${w}%`,
                background: "linear-gradient(90deg, rgba(99,102,241,0.2), rgba(6,182,212,0.2))",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Job card skeleton
export const JobCardSkeleton = () => (
  <div className="p-5 rounded-2xl glass-panel space-y-3">
    <div className="flex items-start gap-3">
      <SkeletonBlock className="h-10 w-10 rounded-xl shrink-0" />
      <div className="flex-1 space-y-2">
        <SkeletonBlock className="h-4 w-40" />
        <SkeletonBlock className="h-3 w-28" />
      </div>
      <SkeletonBlock className="h-6 w-16 rounded-full" />
    </div>
    <div className="flex gap-2">
      <SkeletonBlock className="h-5 w-16 rounded-full" />
      <SkeletonBlock className="h-5 w-20 rounded-full" />
      <SkeletonBlock className="h-5 w-14 rounded-full" />
    </div>
    <SkeletonBlock className="h-8 w-full rounded-lg" />
  </div>
);

// Dashboard skeleton
export const DashboardSkeleton = () => (
  <main className="container max-w-5xl mx-auto px-6 py-8">
    <div className="grid gap-8">
      <div className="space-y-2">
        <SkeletonBlock className="h-10 w-72" />
        <SkeletonBlock className="h-4 w-96" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[0, 1, 2, 3].map((i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <ResumeUploadSkeleton />
        </div>
        <div className="space-y-4">
          {[0, 1, 2].map((i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  </main>
);

// Shimmer text line
export const ShimmerLine = ({ width = "full" }: { width?: string }) => (
  <div className={`h-3 rounded w-${width} relative overflow-hidden`} style={{ background: "rgba(99,102,241,0.04)" }}>
    <div
      className="absolute inset-0 animate-shimmer-sweep"
      style={{
        background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)",
      }}
    />
  </div>
);

export default SkeletonBlock;
