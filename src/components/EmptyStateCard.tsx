import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Info } from 'lucide-react';

interface EmptyStateCardProps {
  title: string;
  description: string;
  onAddNew: () => void;
  addButtonText: string;
  icon?: React.ReactNode;
}

export const EmptyStateCard = ({ 
  title, 
  description, 
  onAddNew, 
  addButtonText, 
  icon 
}: EmptyStateCardProps) => {
  return (
    <Card className="border-2 border-dashed border-muted-foreground/25 bg-muted/5">
      <CardHeader className="text-center pb-4">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted/20">
          {icon || <Info className="h-8 w-8 text-muted-foreground" />}
        </div>
        <CardTitle className="text-xl font-semibold text-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <p className="text-muted-foreground text-sm leading-relaxed max-w-md mx-auto">
          {description}
        </p>
        <Button onClick={onAddNew} className="gap-2" size="lg">
          <Plus className="h-4 w-4" />
          {addButtonText}
        </Button>
      </CardContent>
    </Card>
  );
};