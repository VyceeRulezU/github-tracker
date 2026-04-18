import { GitBranch, Users, MapPin, Link as LinkIcon, Calendar } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { Skeleton } from '../ui/Loader';
import { Button } from '../ui/Button';

export const ProfileCard = ({ user, loading }) => {
  if (loading) {
    return (
      <Card className="overflow-hidden border-none shadow-premium">
        <div className="h-24 bg-gradient-to-r from-primary/20 to-blue-400/20" />
        <CardContent className="relative pt-0">
          <div className="absolute -top-12 left-6">
            <Skeleton className="h-24 w-24 rounded-2xl border-4 border-background" />
          </div>
          <div className="pt-16 pb-4 space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-7 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-16 w-full" />
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!user) return null;

  return (
    <Card className="overflow-hidden border-none shadow-premium-hover group">
      <div className="h-24 bg-gradient-to-r from-primary to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.8),transparent)]" />
      </div>
      <CardContent className="relative pt-0 px-6">
        <div className="absolute -top-12 left-6">
          <div className="p-1 rounded-[1.25rem] bg-background shadow-lg transition-transform duration-500 group-hover:scale-105">
            <img 
              src={user.avatar_url} 
              alt={user.name} 
              className="h-24 w-24 rounded-2xl object-cover"
            />
          </div>
        </div>
        
        <div className="pt-16 pb-4">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">{user.name || user.login}</h2>
              <p className="text-primary font-medium text-sm">@{user.login}</p>
            </div>
            <a href={user.html_url} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="rounded-full">
                <GitBranch size={14} className="mr-2" />
                View Profile
              </Button>
            </a>
          </div>

          <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
            {user.bio || "This user hasn't added a bio yet."}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 text-[13px] text-muted-foreground mb-6">
            {user.location && (
              <div className="flex items-center space-x-2">
                <MapPin size={14} className="text-primary/60" />
                <span>{user.location}</span>
              </div>
            )}
            {user.blog && (
              <div className="flex items-center space-x-2 truncate">
                <LinkIcon size={14} className="text-primary/60" />
                <a href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  {user.blog.replace(/^https?:\/\//, '')}
                </a>
              </div>
            )}
            <div className="flex items-center space-x-2">
              <Calendar size={14} className="text-primary/60" />
              <span>Joined {new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users size={14} className="text-primary/60" />
              <span>{user.followers} followers · {user.following} following</span>
            </div>
          </div>

          <div className="flex items-center space-x-4 pt-4 border-t border-border/50">
            <div className="flex flex-col">
              <span className="text-lg font-bold">{user.public_repos}</span>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Public Repos</span>
            </div>
            <div className="w-px h-8 bg-border/50" />
            <div className="flex flex-col">
              <span className="text-lg font-bold">{user.public_gists}</span>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Public Gists</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
