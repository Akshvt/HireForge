import { useEffect, useState } from "react";
import { History, Download, FileText, Calendar, MoreVertical, Trash2 } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import api from "@/services/api";
import { ResumeHistoryItem } from "@/types/resume";
import { format } from "date-fns";
import { toast } from "sonner";

export default function ResumeHistory() {
    const [history, setHistory] = useState<ResumeHistoryItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchHistory = async () => {
        try {
            setIsLoading(true);
            const response = await api.get<{ history: ResumeHistoryItem[] }>("/api/resumes/history");
            setHistory(response.data.history);
        } catch (error) {
            console.error("Failed to fetch history:", error);
            toast.error("Failed to load resume history");
        } finally {
            setIsLoading(false);
        }
    };

    const handleExport = async (id: string, version: number) => {
        try {
            const response = await api.get<Blob>(`/api/resumes/${id}/export`, { responseType: 'blob' });
            const url = window.URL.createObjectURL(response.data);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `resume-v${version}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            toast.error("Failed to export resume");
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    if (isLoading && history.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                        <History className="h-5 w-5" />
                        Resume History
                    </CardTitle>
                </CardHeader>
                <CardContent className="h-32 flex items-center justify-center">
                    <p className="text-muted-foreground animate-pulse">Loading history...</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="shadow-lg border-0 overflow-hidden">
            <CardHeader className="gradient-primary text-primary-foreground">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary-foreground/10">
                            <History className="h-5 w-5" />
                        </div>
                        <div>
                            <CardTitle className="text-xl">Resume History</CardTitle>
                            <CardDescription className="text-primary-foreground/70">
                                Access your previous resume versions
                            </CardDescription>
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pt-6">
                {history.length === 0 ? (
                    <div className="text-center py-12 space-y-3">
                        <div className="bg-muted rounded-full p-4 w-fit mx-auto">
                            <FileText className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <p className="text-muted-foreground">No previous versions found.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {history.map((item) => (
                            <div
                                key={item._id}
                                className="flex items-center justify-between p-4 rounded-xl border bg-card hover:bg-muted/50 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
                                        v{item.version}
                                    </div>
                                    <div className="space-y-1">
                                        <p className="font-semibold capitalize">Resume version {item.version}</p>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <Calendar className="h-3 w-3" />
                                            {format(new Date(item.createdAt), "PPP")}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="gap-2"
                                        onClick={() => handleExport(item._id, item.version)}
                                    >
                                        <Download className="h-4 w-4" />
                                        <span>Export</span>
                                    </Button>

                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem
                                                className="text-destructive focus:text-destructive"
                                                onClick={async () => {
                                                    try {
                                                        await api.delete(`/api/resumes/${item._id}`);
                                                        toast.success("Resume version deleted");
                                                        fetchHistory();
                                                    } catch (error) {
                                                        toast.error("Failed to delete resume");
                                                    }
                                                }}
                                            >
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                <span>Delete version</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
