import { cn } from "@/lib/utils";

// Generic shimmer skeleton block
const SkeletonBlock = ({ className }: { className?: string }) => (
  <div className={cn("rounded-lg bg-muted animate-pulse", className)} />
);

// Card skeleton with shimmer
export const CardSkeleton = ({ className }: { className?: string }) => (
  <div className={cn("p-5 rounded-2xl border bg-card space-y-3", className)}>
    <SkeletonBlock className="h-4 w-1/3" />
    <SkeletonBlock className="h-3 w-full" />
    <SkeletonBlock className="h-3 w-4/5" />
    <SkeletonBlock className="h-3 w-2/3" />
  </div>
);

// Stats card skeleton (for dashboard stat cards)
export const StatCardSkeleton = () => (
  <div className="p-4 rounded-2xl border bg-card space-y-3">
    <div className="flex items-center justify-between">
      <SkeletonBlock className="h-4 w-4 rounded-full" />
    </div>
    <SkeletonBlock className="h-7 w-12" />
    <SkeletonBlock className="h-3 w-20" />
  </div>
);

// Resume upload skeleton
export const ResumeUploadSkeleton = () => (
  <div className="p-8 rounded-3xl border bg-card space-y-5">
    <div className="space-y-2">
      <SkeletonBlock className="h-5 w-36" />
      <SkeletonBlock className="h-3 w-64" />
    </div>
    <div className="h-40 rounded-2xl border-2 border-dashed border-muted flex items-center justify-center">
      <SkeletonBlock className="h-10 w-10 rounded-full" />
    </div>
    <SkeletonBlock className="h-10 w-full rounded-lg" />
  </div>
);

// ATS Score skeleton
export const ATSSkeleton = () => (
  <div className="p-6 rounded-3xl border bg-card space-y-6">
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
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-muted-foreground/20 animate-pulse"
              style={{ width: `${w}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Job card skeleton
export const JobCardSkeleton = () => (
  <div className="p-5 rounded-2xl border bg-card space-y-3">
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

// Full page loading skeleton (dashboard)
export const DashboardSkeleton = () => (
  <main className="container max-w-5xl mx-auto px-4 py-8">
    <div className="grid gap-8">
      {/* Welcome */}
      <div className="space-y-2">
        <SkeletonBlock className="h-8 w-56" />
        <SkeletonBlock className="h-4 w-80" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[0, 1, 2, 3].map(i => <StatCardSkeleton key={i} />)}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <ResumeUploadSkeleton />
        </div>
        <div className="space-y-4">
          {[0, 1, 2].map(i => <CardSkeleton key={i} />)}
        </div>
      </div>
    </div>
  </main>
);

// Shimmer text line (for inline content loading)
export const ShimmerLine = ({ width = "full" }: { width?: string }) => (
  <div className={`h-3 rounded bg-muted animate-pulse w-${width}`} />
);

export default SkeletonBlock;
