import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import api from "@/services/api";

const Profile = () => {
    const { user, updateUser } = useAuthStore();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        targetRole: user?.careerPreferences?.targetRole || "",
        industry: user?.careerPreferences?.industry || "",
        experienceLevel: user?.careerPreferences?.experienceLevel || "",
        location: user?.careerPreferences?.location || "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await api.put("/api/users/profile", {
                name: formData.name,
                careerPreferences: {
                    targetRole: formData.targetRole,
                    industry: formData.industry,
                    experienceLevel: formData.experienceLevel,
                    location: formData.location,
                },
            });

            updateUser(response.data);
            toast.success("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Failed to update profile.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container max-w-2xl mx-auto py-10 px-4">
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <Avatar className="h-20 w-20">
                            <AvatarImage src={user?.avatar} />
                            <AvatarFallback className="text-2xl">{user?.name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle className="text-2xl">Your Profile</CardTitle>
                            <CardDescription>Update your personal information and career preferences.</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" value={formData.email} disabled />
                            </div>
                        </div>

                        <div className="pt-4 border-t space-y-4">
                            <h3 className="font-semibold text-lg">Career Preferences</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="targetRole">Target Role</Label>
                                    <Input
                                        id="targetRole"
                                        name="targetRole"
                                        placeholder="e.g. Senior Frontend Dev"
                                        value={formData.targetRole}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="industry">Industry</Label>
                                    <Input
                                        id="industry"
                                        name="industry"
                                        placeholder="e.g. Fintech, E-commerce"
                                        value={formData.industry}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="experienceLevel">Experience Level</Label>
                                    <Input
                                        id="experienceLevel"
                                        name="experienceLevel"
                                        placeholder="e.g. Mid-level, Senior"
                                        value={formData.experienceLevel}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="location">Preferred Location</Label>
                                    <Input
                                        id="location"
                                        name="location"
                                        placeholder="e.g. Remote, New York"
                                        value={formData.location}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? "Saving..." : "Save Changes"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Profile;
