import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Download,
  Maximize,
  Grid3X3,
  Users,
  Building2,
  Crown,
  Layers
} from 'lucide-react';
import { Department } from '@/hooks/useDepartments';

interface OrganizationalChartProps {
  departments: Department[];
}

interface ChartNode {
  id: string;
  name: string;
  nameEn?: string;
  code: string;
  functionType: string;
  headCount: number;
  manager?: string;
  children: ChartNode[];
  x: number;
  y: number;
  width: number;
  height: number;
}

const OrganizationalChart: React.FC<OrganizationalChartProps> = ({ departments }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [zoom, setZoom] = useState(1);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [chartLayout, setChartLayout] = useState<'vertical' | 'horizontal'>('vertical');
  
  // Convert departments to chart nodes
  const buildChartNodes = (parentId: string | null = null, level = 0): ChartNode[] => {
    return departments
      .filter(dept => dept.parent_department_id === parentId && dept.is_active)
      .map(dept => ({
        id: dept.id,
        name: dept.name_ar,
        nameEn: dept.name_en,
        code: dept.department_code,
        functionType: dept.function_type,
        headCount: dept.head_count || 0,
        manager: 'اسم المدير', // This would come from employee data
        children: buildChartNodes(dept.id, level + 1),
        x: 0,
        y: 0,
        width: 200,
        height: 80
      }));
  };

  const chartNodes = buildChartNodes();

  // Calculate positions for nodes
  const calculateLayout = (nodes: ChartNode[], startX = 0, startY = 0): void => {
    const nodeSpacing = chartLayout === 'vertical' ? { x: 250, y: 120 } : { x: 120, y: 250 };
    
    const positionNode = (node: ChartNode, x: number, y: number, siblingIndex = 0): number => {
      node.x = x;
      node.y = y;
      
      if (node.children.length === 0) {
        return x + nodeSpacing.x;
      }
      
      let childX = x;
      const childY = y + nodeSpacing.y;
      
      node.children.forEach((child, index) => {
        childX = positionNode(child, childX, childY, index);
      });
      
      // Center parent over children
      if (node.children.length > 0) {
        const firstChild = node.children[0];
        const lastChild = node.children[node.children.length - 1];
        node.x = (firstChild.x + lastChild.x) / 2;
      }
      
      return childX;
    };
    
    let currentX = startX;
    nodes.forEach((node, index) => {
      currentX = positionNode(node, currentX, startY, index);
    });
  };

  useEffect(() => {
    calculateLayout(chartNodes, 100, 50);
  }, [departments, chartLayout]);

  const handleZoomIn = () => setZoom(prev => Math.min(prev * 1.2, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev / 1.2, 0.3));
  const handleResetView = () => {
    setZoom(1);
    setPanX(0);
    setPanY(0);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - panX, y: e.clientY - panY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPanX(e.clientX - dragStart.x);
      setPanY(e.clientY - dragStart.y);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const getFunctionColor = (functionType: string) => {
    switch (functionType) {
      case 'strategic': return '#8B5CF6';
      case 'operational': return '#3B82F6';
      case 'support': return '#10B981';
      default: return '#6B7280';
    }
  };

  const getFunctionIcon = (functionType: string) => {
    switch (functionType) {
      case 'strategic': return Crown;
      case 'operational': return Layers;
      case 'support': return Users;
      default: return Building2;
    }
  };

  const renderConnections = (nodes: ChartNode[]): JSX.Element[] => {
    const connections: JSX.Element[] = [];
    
    const drawConnections = (node: ChartNode) => {
      node.children.forEach((child) => {
        const startX = node.x + node.width / 2;
        const startY = node.y + node.height;
        const endX = child.x + child.width / 2;
        const endY = child.y;
        
        connections.push(
          <line
            key={`${node.id}-${child.id}`}
            x1={startX}
            y1={startY}
            x2={endX}
            y2={endY}
            stroke="#D1D5DB"
            strokeWidth="2"
            strokeDasharray={child.functionType === 'support' ? '5,5' : 'none'}
          />
        );
        
        // Add connection point
        connections.push(
          <circle
            key={`point-${node.id}-${child.id}`}
            cx={startX}
            cy={startY}
            r="3"
            fill="#9CA3AF"
          />
        );
        
        drawConnections(child);
      });
    };
    
    nodes.forEach(drawConnections);
    return connections;
  };

  const renderNodes = (nodes: ChartNode[]): JSX.Element[] => {
    const elements: JSX.Element[] = [];
    
    const renderNode = (node: ChartNode) => {
      const FunctionIcon = getFunctionIcon(node.functionType);
      const isSelected = selectedNode === node.id;
      
      elements.push(
        <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
          {/* Node background */}
          <rect
            width={node.width}
            height={node.height}
            rx="8"
            fill="white"
            stroke={isSelected ? getFunctionColor(node.functionType) : '#E5E7EB'}
            strokeWidth={isSelected ? '3' : '1'}
            className="drop-shadow-sm cursor-pointer transition-all duration-200 hover:stroke-gray-400"
            onClick={() => setSelectedNode(isSelected ? null : node.id)}
          />
          
          {/* Function type indicator */}
          <rect
            width={node.width}
            height="6"
            rx="8 8 0 0"
            fill={getFunctionColor(node.functionType)}
          />
          
          {/* Department icon */}
          <foreignObject x="8" y="12" width="24" height="24">
            <div className="w-6 h-6 flex items-center justify-center">
              <FunctionIcon size={16} color={getFunctionColor(node.functionType)} />
            </div>
          </foreignObject>
          
          {/* Department code */}
          <text
            x={node.width - 8}
            y="26"
            textAnchor="end"
            className="text-xs font-mono fill-gray-500"
          >
            {node.code}
          </text>
          
          {/* Department name */}
          <text
            x={node.width / 2}
            y="46"
            textAnchor="middle"
            className="text-sm font-semibold fill-gray-900"
            style={{ fontSize: '14px' }}
          >
            {node.name.length > 20 ? node.name.substring(0, 18) + '...' : node.name}
          </text>
          
          {/* English name */}
          {node.nameEn && (
            <text
              x={node.width / 2}
              y="60"
              textAnchor="middle"
              className="text-xs fill-gray-600"
              style={{ fontSize: '11px' }}
            >
              {node.nameEn.length > 25 ? node.nameEn.substring(0, 23) + '...' : node.nameEn}
            </text>
          )}
          
          {/* Employee count */}
          <text
            x="8"
            y="74"
            className="text-xs fill-gray-600"
            style={{ fontSize: '11px' }}
          >
            👥 {node.headCount}
          </text>
        </g>
      );
      
      node.children.forEach(renderNode);
    };
    
    nodes.forEach(renderNode);
    return elements;
  };

  const exportChart = (format: 'png' | 'svg' | 'pdf') => {
    // Mock export functionality
    console.log(`Exporting chart as ${format}`);
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleZoomIn}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={handleZoomOut}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={handleResetView}>
            <RotateCcw className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground px-2">
            {Math.round(zoom * 100)}%
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <Select value={chartLayout} onValueChange={(value: 'vertical' | 'horizontal') => setChartLayout(value)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vertical">عمودي</SelectItem>
              <SelectItem value="horizontal">أفقي</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="sm" onClick={() => exportChart('png')}>
            <Download className="h-4 w-4 mr-2" />
            تصدير
          </Button>
        </div>
      </div>
      
      {/* Chart Container */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div
            ref={containerRef}
            className="relative w-full h-[600px] bg-gray-50 overflow-hidden cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <svg
              ref={svgRef}
              width="100%"
              height="100%"
              className="absolute inset-0"
              style={{
                transform: `translate(${panX}px, ${panY}px) scale(${zoom})`
              }}
            >
              {/* Grid pattern */}
              <defs>
                <pattern
                  id="grid"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 20 0 L 0 0 0 20"
                    fill="none"
                    stroke="#F3F4F6"
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              
              {/* Connections */}
              <g>{renderConnections(chartNodes)}</g>
              
              {/* Nodes */}
              <g>{renderNodes(chartNodes)}</g>
            </svg>
            
            {/* Empty state */}
            {chartNodes.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Building2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                    لا يوجد مخطط تنظيمي
                  </h3>
                  <p className="text-muted-foreground">
                    أضف أقساماً لعرض المخطط التنظيمي
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Selected Node Details */}
      {selectedNode && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">تفاصيل القسم</CardTitle>
          </CardHeader>
          <CardContent>
            {(() => {
              const findNode = (nodes: ChartNode[]): ChartNode | null => {
                for (const node of nodes) {
                  if (node.id === selectedNode) return node;
                  const found = findNode(node.children);
                  if (found) return found;
                }
                return null;
              };
              
              const node = findNode(chartNodes);
              
              return node ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Badge className="bg-primary text-primary-foreground">
                      {node.code}
                    </Badge>
                    <div>
                      <h4 className="font-semibold">{node.name}</h4>
                      {node.nameEn && (
                        <p className="text-sm text-muted-foreground">{node.nameEn}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">نوع الوظيفة:</span>
                      <span className="mr-2 font-medium">
                        {node.functionType === 'strategic' ? 'استراتيجي' :
                         node.functionType === 'operational' ? 'تشغيلي' : 'دعم'}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">عدد الموظفين:</span>
                      <span className="mr-2 font-medium">{node.headCount}</span>
                    </div>
                  </div>
                  
                  {node.children.length > 0 && (
                    <div>
                      <span className="text-muted-foreground">الأقسام الفرعية:</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {node.children.map(child => (
                          <Badge key={child.id} variant="secondary">
                            {child.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : null;
            })()}
          </CardContent>
        </Card>
      )}
      
      {/* Legend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">دليل الألوان</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-500 rounded"></div>
              <span className="text-sm">استراتيجي</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span className="text-sm">تشغيلي</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-sm">دعم</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrganizationalChart;