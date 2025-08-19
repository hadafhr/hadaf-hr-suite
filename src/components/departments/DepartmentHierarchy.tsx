import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  ChevronDown,
  ChevronRight,
  Building2,
  Users,
  Crown,
  Layers,
  GitBranch,
  Plus,
  Edit2,
  Trash2,
  Move,
  Search,
  Filter
} from 'lucide-react';
import { Department } from '@/hooks/useDepartments';

interface DepartmentNode extends Department {
  children: DepartmentNode[];
  level: number;
}

interface DepartmentHierarchyProps {
  departments: Department[];
  onSelectDepartment: (id: string) => void;
  showAdvanced?: boolean;
}

const DepartmentHierarchy: React.FC<DepartmentHierarchyProps> = ({
  departments,
  onSelectDepartment,
  showAdvanced = false
}) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [draggedDepartment, setDraggedDepartment] = useState<string | null>(null);
  const [hoveredTarget, setHoveredTarget] = useState<string | null>(null);

  // Build hierarchical tree structure
  const departmentTree = useMemo(() => {
    const buildTree = (parentId: string | null = null, level = 0): DepartmentNode[] => {
      return departments
        .filter(dept => dept.parent_department_id === parentId && dept.is_active)
        .map(dept => ({
          ...dept,
          children: buildTree(dept.id, level + 1),
          level
        }))
        .sort((a, b) => a.sort_order - b.sort_order);
    };

    return buildTree();
  }, [departments]);

  // Filter tree based on search term
  const filteredTree = useMemo(() => {
    if (!searchTerm) return departmentTree;

    const filterNode = (node: DepartmentNode): DepartmentNode | null => {
      const matchesSearch = node.name_ar.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           node.name_en?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           node.department_code.toLowerCase().includes(searchTerm.toLowerCase());

      const filteredChildren = node.children.map(child => filterNode(child)).filter(Boolean) as DepartmentNode[];

      if (matchesSearch || filteredChildren.length > 0) {
        return { ...node, children: filteredChildren };
      }

      return null;
    };

    return departmentTree.map(node => filterNode(node)).filter(Boolean) as DepartmentNode[];
  }, [departmentTree, searchTerm]);

  const toggleExpand = (nodeId: string) => {
    setExpandedNodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  };

  const expandAll = () => {
    const allIds = new Set<string>();
    const collectIds = (nodes: DepartmentNode[]) => {
      nodes.forEach(node => {
        allIds.add(node.id);
        collectIds(node.children);
      });
    };
    collectIds(departmentTree);
    setExpandedNodes(allIds);
  };

  const collapseAll = () => {
    setExpandedNodes(new Set());
  };

  const getFunctionIcon = (functionType: string) => {
    switch (functionType) {
      case 'strategic': return Crown;
      case 'operational': return Layers;
      case 'support': return Users;
      default: return Building2;
    }
  };

  const getFunctionColor = (functionType: string) => {
    switch (functionType) {
      case 'strategic': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'operational': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'support': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const handleDragStart = (e: React.DragEvent, departmentId: string) => {
    setDraggedDepartment(departmentId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    setHoveredTarget(targetId);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    // Only clear hover if we're leaving the entire element
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    
    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      setHoveredTarget(null);
    }
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    setHoveredTarget(null);
    
    if (draggedDepartment && draggedDepartment !== targetId) {
      // TODO: Implement department move logic
      console.log(`Move department ${draggedDepartment} under ${targetId}`);
    }
    
    setDraggedDepartment(null);
  };

  const renderDepartmentNode = (node: DepartmentNode) => {
    const isExpanded = expandedNodes.has(node.id);
    const hasChildren = node.children.length > 0;
    const FunctionIcon = getFunctionIcon(node.function_type);
    const isDraggedOver = hoveredTarget === node.id;

    return (
      <div key={node.id} className="select-none">
        <div
          className={`
            flex items-center gap-2 p-3 rounded-lg border transition-all duration-200
            hover:shadow-md cursor-pointer group
            ${isDraggedOver ? 'bg-primary/10 border-primary scale-105' : 'bg-white hover:bg-gray-50'}
            ${getFunctionColor(node.function_type)}
          `}
          style={{ marginLeft: `${node.level * 24}px` }}
          draggable={showAdvanced}
          onDragStart={(e) => handleDragStart(e, node.id)}
          onDragOver={handleDragOver}
          onDragEnter={(e) => handleDragEnter(e, node.id)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, node.id)}
          onClick={() => onSelectDepartment(node.id)}
        >
          {/* Expand/Collapse Button */}
          <Button
            variant="ghost"
            size="sm"
            className="p-0 h-6 w-6 hover:bg-transparent"
            onClick={(e) => {
              e.stopPropagation();
              if (hasChildren) toggleExpand(node.id);
            }}
          >
            {hasChildren ? (
              isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )
            ) : (
              <div className="h-4 w-4" />
            )}
          </Button>

          {/* Department Icon */}
          <div className="p-2 rounded-lg bg-white/80">
            <FunctionIcon className="h-5 w-5" />
          </div>

          {/* Department Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-foreground truncate">
                {node.name_ar}
              </h4>
              {node.name_en && (
                <span className="text-sm text-muted-foreground truncate">
                  ({node.name_en})
                </span>
              )}
              <Badge variant="secondary" className="text-xs">
                {node.department_code}
              </Badge>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                <span>{node.head_count || 0} موظف</span>
              </div>
              
              {node.location && (
                <span className="truncate max-w-32">{node.location}</span>
              )}
              
              {hasChildren && (
                <div className="flex items-center gap-1">
                  <GitBranch className="h-3 w-3" />
                  <span>{node.children.length} قسم فرعي</span>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          {showAdvanced && (
            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Plus className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Move className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Children */}
        {hasChildren && isExpanded && (
          <div className="mt-2 space-y-2">
            {node.children.map(child => renderDepartmentNode(child))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="البحث في الهيكل التنظيمي..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={expandAll}>
            توسيع الكل
          </Button>
          <Button variant="outline" size="sm" onClick={collapseAll}>
            طي الكل
          </Button>
        </div>
      </div>

      {/* Hierarchy Tree */}
      <Card className="p-6">
        <CardContent className="p-0">
          {filteredTree.length > 0 ? (
            <div className="space-y-3">
              {filteredTree.map(node => renderDepartmentNode(node))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                لا توجد أقسام
              </h3>
              <p className="text-muted-foreground">
                {searchTerm ? 'لا توجد نتائج للبحث المحدد' : 'لم يتم إنشاء أي أقسام بعد'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Legend */}
      {showAdvanced && (
        <Card className="p-4">
          <CardContent className="p-0">
            <h4 className="font-semibold mb-3">دليل الألوان والرموز</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Crown className="h-4 w-4 text-purple-600" />
                <span className="text-sm">استراتيجي</span>
              </div>
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-blue-600" />
                <span className="text-sm">تشغيلي</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-green-600" />
                <span className="text-sm">دعم</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DepartmentHierarchy;