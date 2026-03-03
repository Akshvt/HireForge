import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Target, Briefcase, TrendingUp, FileText } from "lucide-react";
import Header from "@/components/Header";
import ResumeUpload from "@/components/ResumeUpload";
import ATSScore from "@/components/ATSScore";
import JobRecommendations from "@/components/JobRecommendations";
import CareerPath from "@/components/CareerPath";
import type { ResumeData } from "@/types/resume";

const Index = () => {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);

  const isResumeUploaded = resumeData && resumeData.resume_text.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container max-w-5xl mx-auto px-4 py-8 -mt-8">
        <div className="grid gap-8">
          {/* Resume Upload - Always visible */}
          <section className="animate-slide-up">
            <ResumeUpload onParsed={setResumeData} resumeData={resumeData} />
          </section>

          {/* Feature Tabs - Only visible after resume upload */}
          {isResumeUploaded && (
            <section className="animate-slide-up stagger-2">
              <Tabs defaultValue="ats" className="w-full">
                <TabsList className="w-full grid grid-cols-3 h-auto p-1 bg-muted rounded-xl">
                  <TabsTrigger 
                    value="ats" 
                    className="flex items-center gap-2 py-3 data-[state=active]:gradient-accent data-[state=active]:text-accent-foreground rounded-lg"
                  >
                    <Target className="h-4 w-4" />
                    <span className="hidden sm:inline">ATS Score</span>
                    <span className="sm:hidden">ATS</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="jobs" 
                    className="flex items-center gap-2 py-3 data-[state=active]:gradient-accent data-[state=active]:text-accent-foreground rounded-lg"
                  >
                    <Briefcase className="h-4 w-4" />
                    <span className="hidden sm:inline">Jobs</span>
                    <span className="sm:hidden">Jobs</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="career" 
                    className="flex items-center gap-2 py-3 data-[state=active]:gradient-accent data-[state=active]:text-accent-foreground rounded-lg"
                  >
                    <TrendingUp className="h-4 w-4" />
                    <span className="hidden sm:inline">Career Path</span>
                    <span className="sm:hidden">Career</span>
                  </TabsTrigger>
                </TabsList>

                <div className="mt-6">
                  <TabsContent value="ats" className="mt-0">
                    <ATSScore resumeData={resumeData} />
                  </TabsContent>
                  <TabsContent value="jobs" className="mt-0">
                    <JobRecommendations resumeData={resumeData} />
                  </TabsContent>
                  <TabsContent value="career" className="mt-0">
                    <CareerPath resumeData={resumeData} />
                  </TabsContent>
                </div>
              </Tabs>
            </section>
          )}

          {/* Empty State */}
          {!isResumeUploaded && (
            <section className="text-center py-12 animate-fade-in stagger-3">
              <div className="p-4 rounded-full bg-muted inline-flex mb-4">
                <FileText className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Ready to optimize your career?
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Upload your resume above to unlock ATS scoring, job recommendations, and personalized career paths.
              </p>
            </section>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-8 mt-12">
        <div className="container max-w-5xl mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Built with AI to help you land your dream job</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
