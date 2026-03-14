import { useAuthStore } from "@/store/authStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ResumeUpload from "@/components/ResumeUpload";
import ATSScore from "@/components/ATSScore";
import JobRecommendations from "@/components/JobRecommendations";
import CareerPath from "@/components/CareerPath";
import ResumeHistory from "@/components/ResumeHistory";
import { useState, useEffect } from "react";
import type { ResumeData } from "@/types/resume";
import { FileText, Award, Briefcase, Zap } from "lucide-react";
import JDTargeting from "@/components/JDTargeting";
import CareerTipsFeed from "@/components/CareerTipsFeed";
import api from "@/services/api";

const Dashboard = () => {
  const user = useAuthStore((state) => state.user);
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [statsData, setStatsData] = useState({
    totalResumes: 0,
    averageAts: "0%",
    jobMatchesCount: 0,
    aiRewritesCount: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get<{
          totalResumes: number;
          averageAts: string;
          jobMatchesCount: number;
          aiRewritesCount: number;
        }>('/api/resumes/stats');
        setStatsData(response.data);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };

    fetchStats();
  }, [resumeData]); // Refetch when a new resume is uploaded

  const isResumeUploaded = resumeData && resumeData.resume_text.length > 0;

  const stats = [
    { label: "Total Resumes", value: statsData.totalResumes.toString(), icon: FileText, color: "text-blue-500" },
    { label: "Average ATS", value: statsData.averageAts, icon: Award, color: "text-green-500" },
    { label: "Job Matches", value: statsData.jobMatchesCount.toString(), icon: Briefcase, color: "text-orange-500" },
    { label: "AI Rewrites", value: statsData.aiRewritesCount.toString(), icon: Zap, color: "text-purple-500" },
  ];

  return (
    <main className="container max-w-5xl mx-auto px-4 py-8">
      <div className="grid gap-8">
        {/* Welcome Section */}
        <section className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name}</h1>
          <p className="text-muted-foreground">
            Monitor your resume performance and career growth activities.
          </p>
        </section>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <Card key={i} className="border-0 shadow-sm bg-card hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            {/* Resume Upload / Active Analysis */}
            <section className="animate-slide-up">
              <ResumeUpload onParsed={setResumeData} resumeData={resumeData} />
            </section>

            {isResumeUploaded && (
              <section className="animate-slide-up">
                <Tabs defaultValue="ats" className="w-full">
                  <TabsList className="w-full grid grid-cols-4">
                    <TabsTrigger value="ats">ATS Score</TabsTrigger>
                    <TabsTrigger value="jd">JD Target</TabsTrigger>
                    <TabsTrigger value="jobs">Jobs</TabsTrigger>
                    <TabsTrigger value="career">Career Path</TabsTrigger>
                  </TabsList>
                  <TabsContent value="ats" className="mt-6">
                    <ATSScore resumeData={resumeData} />
                  </TabsContent>
                  <TabsContent value="jd" className="mt-6">
                    <JDTargeting resumeData={resumeData} />
                  </TabsContent>
                  <TabsContent value="jobs" className="mt-6">
                    {resumeData.skills.length > 0 ? (
                      <JobRecommendations resumeData={resumeData} />
                    ) : (
                      <Card className="p-8 text-center border-dashed border-muted-foreground/25">
                        <p className="text-muted-foreground text-sm italic">
                          Resume upload lacked skill extraction. Please re-upload for jobs.
                        </p>
                      </Card>
                    )}
                  </TabsContent>
                  <TabsContent value="career" className="mt-6">
                    {resumeData.skills.length > 0 ? (
                      <CareerPath resumeData={resumeData} />
                    ) : (
                      <Card className="p-8 text-center border-dashed border-muted-foreground/25">
                        <p className="text-muted-foreground text-sm italic">
                          Resume upload lacked skill extraction. Please re-upload for career path.
                        </p>
                      </Card>
                    )}
                  </TabsContent>
                </Tabs>
              </section>
            )}
          </div>

          <div className="space-y-6">
            <CareerTipsFeed />
            <ResumeHistory />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
