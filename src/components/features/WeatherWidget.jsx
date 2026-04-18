import { useFetch } from '../../hooks/useFetch';
import { weatherService } from '../../services/weatherService';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Skeleton } from '../ui/Loader';
import { Cloud, Sun, CloudRain, Wind, Thermometer } from 'lucide-react';

const WeatherIcon = ({ condition }) => {
  const cond = condition.toLowerCase();
  if (cond.includes('sun') || cond.includes('clear')) return <Sun className="w-10 h-10 text-yellow-500" />;
  if (cond.includes('rain')) return <CloudRain className="w-10 h-10 text-blue-500" />;
  if (cond.includes('cloud')) return <Cloud className="w-10 h-10 text-gray-400" />;
  return <Wind className="w-10 h-10 text-primary" />;
};

export const WeatherWidget = ({ city = 'Lagos' }) => {
  const { data, loading, error } = useFetch(weatherService.getWeatherUrl(city));

  if (loading) return (
    <Card className="h-full">
      <CardHeader>
        <Skeleton className="h-6 w-24" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-12 w-full rounded-xl" />
          <Skeleton className="h-12 w-full rounded-xl" />
        </div>
      </CardContent>
    </Card>
  );

  if (error) return (
    <Card className="h-full border-destructive/20 bg-destructive/5 text-destructive">
      <CardContent className="flex flex-col items-center justify-center h-full p-6 text-center space-y-2">
        <AlertCircle className="w-8 h-8 opacity-50" />
        <p className="text-sm font-medium">Weather data unavailable for {city}</p>
      </CardContent>
    </Card>
  );

  const current = data?.current_condition?.[0];

  return (
    <Card className="h-full bg-gradient-to-br from-primary/5 to-white dark:from-primary/10 dark:to-background overflow-hidden relative border-none shadow-premium-hover">
      <div className="absolute top-[-10%] right-[-5%] opacity-10 rotate-12">
        <Sun size={100} />
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-primary uppercase tracking-widest flex items-center justify-between">
          <span>{city}</span>
          <Thermometer size={14} className="opacity-50" />
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-center space-x-6">
          <div className="transition-transform duration-500 hover:scale-110">
            <WeatherIcon condition={current?.weatherDesc?.[0]?.value || ''} />
          </div>
          <div className="flex flex-col">
            <span className="text-4xl font-bold tracking-tighter text-foreground">
              {current?.temp_C}°C
            </span>
            <span className="text-sm font-medium text-muted-foreground capitalize">
              {current?.weatherDesc?.[0]?.value}
            </span>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-white dark:bg-accent/30 p-3 rounded-2xl shadow-sm border border-border/50">
            <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground/70 mb-1">Humidity</p>
            <p className="text-sm font-bold">{current?.humidity}%</p>
          </div>
          <div className="bg-white dark:bg-accent/30 p-3 rounded-2xl shadow-sm border border-border/50">
            <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground/70 mb-1">Wind</p>
            <p className="text-sm font-bold">{current?.windspeedKmph} <span className="text-[10px] font-normal">km/h</span></p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
