import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Map, MapPin, Filter, Search, Layers, Circle, Square, 
  AlertTriangle, CheckCircle, Clock, Eye, Target, Settings,
  ZoomIn, ZoomOut, RotateCcw, Download, Share, Maximize
} from 'lucide-react';

const GeoExpiriesMap = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  
  const [selectedLayers, setSelectedLayers] = useState({
    expiries: true,
    heatmap: true,
    compliance: true
  });
  
  const [filters, setFilters] = useState({
    type: 'all',
    provider: 'all',
    location: 'all',
    status: 'all',
    riskLevel: 'all'
  });

  const [selectedRegion, setSelectedRegion] = useState(null);
  const [mapMode, setMapMode] = useState('satellite');
  const [clusteringEnabled, setClusteringEnabled] = useState(true);

  // Mock data for map pins
  const mapPins = [
    {
      id: 1,
      lat: 24.7136,
      lng: 46.6753,
      title: 'الرياض - الفرع الرئيسي',
      type: 'health',
      expiry: 7,
      status: 'critical',
      coverage: 850000,
      provider: 'TAWUNIYA',
      employees: 120,
      premium: 45000
    },
    {
      id: 2,
      lat: 21.3891,
      lng: 39.8579,
      title: 'مكة المكرمة - فرع الحرم',
      type: 'fleet',
      expiry: 15,
      status: 'warning',
      coverage: 650000,
      provider: 'SALAMA',
      employees: 85,
      premium: 32000
    },
    {
      id: 3,
      lat: 26.3351,
      lng: 43.9686,
      title: 'حائل - فرع الشمال',
      type: 'assets',
      expiry: 45,
      status: 'good',
      coverage: 450000,
      provider: 'SOLIDARITY',
      employees: 60,
      premium: 28000
    },
    {
      id: 4,
      lat: 25.2048,
      lng: 55.2708,
      title: 'دبي - فرع الإمارات',
      type: 'health',
      expiry: 3,
      status: 'critical',
      coverage: 950000,
      provider: 'BUPA',
      employees: 150,
      premium: 55000
    }
  ];

  const getStatusColor = (expiry) => {
    if (expiry <= 7) return '#ef4444'; // Red
    if (expiry <= 30) return '#f97316'; // Orange
    if (expiry <= 90) return '#eab308'; // Yellow
    return '#22c55e'; // Green
  };

  const getStatusIcon = (expiry) => {
    if (expiry <= 7) return AlertTriangle;
    if (expiry <= 30) return Clock;
    if (expiry <= 90) return Eye;
    return CheckCircle;
  };

  const typeIcons = {
    health: '🏥',
    fleet: '🚗',
    assets: '🏢',
    other: '📋'
  };

  return (
    <div className={`space-y-6 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
      {/* Map Controls Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white rounded-2xl shadow-lg border border-gray-200/30">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Map className="h-5 w-5 text-[#3CB593]" />
            <h3 className="text-lg font-semibold text-black">
              {isRTL ? 'خريطة الانتهاءات الجغرافية' : 'Geo Expiries Map'}
            </h3>
          </div>
          <Badge variant="outline" className="border-[#3CB593]/30 text-[#3CB593]">
            {mapPins.length} {isRTL ? 'موقع' : 'Locations'}
          </Badge>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 ml-1" />
            {isRTL ? 'تصدير' : 'Export'}
          </Button>
          <Button variant="outline" size="sm">
            <Share className="h-4 w-4 ml-1" />
            {isRTL ? 'مشاركة' : 'Share'}
          </Button>
          <Button variant="outline" size="sm">
            <Maximize className="h-4 w-4 ml-1" />
            {isRTL ? 'ملء الشاشة' : 'Fullscreen'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Map Filters & Controls */}
        <div className="xl:col-span-1 space-y-6">
          {/* Layer Controls */}
          <Card className="border-0 shadow-lg bg-white/90">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Layers className="h-4 w-4 text-[#3CB593]" />
                {isRTL ? 'طبقات الخريطة' : 'Map Layers'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="expiries-layer" 
                  checked={selectedLayers.expiries}
                  onCheckedChange={(checked) => setSelectedLayers(prev => ({ ...prev, expiries: checked }))}
                />
                <label htmlFor="expiries-layer" className="text-sm font-medium">
                  🔴 {isRTL ? 'علامات الانتهاء' : 'Expiry Pins'}
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="heatmap-layer" 
                  checked={selectedLayers.heatmap}
                  onCheckedChange={(checked) => setSelectedLayers(prev => ({ ...prev, heatmap: checked }))}
                />
                <label htmlFor="heatmap-layer" className="text-sm font-medium">
                  🔥 {isRTL ? 'خريطة الكثافة' : 'Coverage Heatmap'}
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="compliance-layer" 
                  checked={selectedLayers.compliance}
                  onCheckedChange={(checked) => setSelectedLayers(prev => ({ ...prev, compliance: checked }))}
                />
                <label htmlFor="compliance-layer" className="text-sm font-medium">
                  ⚖️ {isRTL ? 'طبقة الامتثال' : 'Compliance Overlay'}
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Quick Filters */}
          <Card className="border-0 shadow-lg bg-white/90">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Filter className="h-4 w-4 text-[#3CB593]" />
                {isRTL ? 'فلاتر سريعة' : 'Quick Filters'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  {isRTL ? 'نوع التأمين' : 'Insurance Type'}
                </label>
                <Select value={filters.type} onValueChange={(value) => setFilters(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{isRTL ? 'جميع الأنواع' : 'All Types'}</SelectItem>
                    <SelectItem value="health">🏥 {isRTL ? 'صحي' : 'Health'}</SelectItem>
                    <SelectItem value="fleet">🚗 {isRTL ? 'أسطول' : 'Fleet'}</SelectItem>
                    <SelectItem value="assets">🏢 {isRTL ? 'أصول' : 'Assets'}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  {isRTL ? 'المزود' : 'Provider'}
                </label>
                <Select value={filters.provider} onValueChange={(value) => setFilters(prev => ({ ...prev, provider: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{isRTL ? 'جميع المزودين' : 'All Providers'}</SelectItem>
                    <SelectItem value="tawuniya">TAWUNIYA</SelectItem>
                    <SelectItem value="bupa">BUPA</SelectItem>
                    <SelectItem value="salama">SALAMA</SelectItem>
                    <SelectItem value="solidarity">SOLIDARITY</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  {isRTL ? 'حالة المخاطر' : 'Risk Status'}
                </label>
                <Select value={filters.status} onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{isRTL ? 'جميع الحالات' : 'All Status'}</SelectItem>
                    <SelectItem value="critical">🔴 {isRTL ? 'حرجة' : 'Critical'}</SelectItem>
                    <SelectItem value="warning">🟠 {isRTL ? 'تحذير' : 'Warning'}</SelectItem>
                    <SelectItem value="good">🟢 {isRTL ? 'جيدة' : 'Good'}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Region Selection */}
          <Card className="border-0 shadow-lg bg-white/90">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Target className="h-4 w-4 text-[#3CB593]" />
                {isRTL ? 'اختيار النطاق' : 'Region Selection'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  {isRTL ? 'المنطقة/المدينة' : 'Region/City'}
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder={isRTL ? 'اختر المنطقة' : 'Select Region'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="riyadh">الرياض</SelectItem>
                    <SelectItem value="makkah">مكة المكرمة</SelectItem>
                    <SelectItem value="eastern">المنطقة الشرقية</SelectItem>
                    <SelectItem value="hail">حائل</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button className="w-full bg-gradient-to-r from-[#3CB593] to-[#2da574] hover:from-[#2da574] hover:to-[#3CB593]">
                <Circle className="h-4 w-4 ml-2" />
                {isRTL ? 'رسم منطقة جغرافية' : 'Draw Geofence'}
              </Button>
            </CardContent>
          </Card>

          {/* Map Settings */}
          <Card className="border-0 shadow-lg bg-white/90">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Settings className="h-4 w-4 text-[#3CB593]" />
                {isRTL ? 'إعدادات الخريطة' : 'Map Settings'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="clustering" 
                  checked={clusteringEnabled}
                  onCheckedChange={setClusteringEnabled}
                />
                <label htmlFor="clustering" className="text-sm font-medium">
                  {isRTL ? 'التجميع الذكي' : 'Smart Clustering'}
                </label>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">
                  {isRTL ? 'نوع الخريطة' : 'Map Type'}
                </label>
                <Select value={mapMode} onValueChange={setMapMode}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="satellite">{isRTL ? 'الأقمار الصناعية' : 'Satellite'}</SelectItem>
                    <SelectItem value="roadmap">{isRTL ? 'خريطة الطرق' : 'Roadmap'}</SelectItem>
                    <SelectItem value="terrain">{isRTL ? 'التضاريس' : 'Terrain'}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Interactive Map */}
        <div className="xl:col-span-3">
          <Card className="border-0 shadow-xl bg-white/95 h-[600px] relative overflow-hidden">
            <CardHeader className="pb-2 border-b border-gray-200/30">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-[#3CB593]" />
                  {isRTL ? 'الخريطة التفاعلية' : 'Interactive Map'}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-0 relative h-full">
              {/* Map Container */}
              <div className="w-full h-full bg-gradient-to-br from-blue-50 to-green-50 relative overflow-hidden">
                {/* Mock Map Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-green-50 to-yellow-50 opacity-60"></div>
                
                {/* Map Pins */}
                {mapPins.map((pin) => {
                  const StatusIcon = getStatusIcon(pin.expiry);
                  return (
                    <div
                      key={pin.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                      style={{
                        left: `${20 + (pin.id * 15)}%`,
                        top: `${30 + (pin.id * 10)}%`
                      }}
                    >
                      {/* Pin */}
                      <div 
                        className="w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white font-bold text-sm hover:scale-125 transition-transform"
                        style={{ backgroundColor: getStatusColor(pin.expiry) }}
                      >
                        {typeIcons[pin.type]}
                      </div>
                      
                      {/* Hover Card */}
                      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-72 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                        <div className="flex items-center gap-3 mb-3">
                          <div 
                            className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                            style={{ backgroundColor: getStatusColor(pin.expiry) }}
                          >
                            <StatusIcon className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-black">{pin.title}</h4>
                            <p className="text-sm text-gray-600">{pin.provider}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div>
                            <p className="text-xs text-gray-500">
                              {isRTL ? 'أيام للانتهاء' : 'Days to Expiry'}
                            </p>
                            <p className="font-semibold text-black">{pin.expiry} {isRTL ? 'يوم' : 'days'}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">
                              {isRTL ? 'التغطية' : 'Coverage'}
                            </p>
                            <p className="font-semibold text-black">{(pin.coverage / 1000).toFixed(0)}K SAR</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">
                              {isRTL ? 'الموظفين' : 'Employees'}
                            </p>
                            <p className="font-semibold text-black">{pin.employees}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">
                              {isRTL ? 'القسط الشهري' : 'Monthly Premium'}
                            </p>
                            <p className="font-semibold text-black">{(pin.premium / 1000).toFixed(0)}K SAR</p>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          <Button size="sm" className="bg-[#3CB593] hover:bg-[#2da574] text-white">
                            {isRTL ? 'تجديد الآن' : 'Renew Now'}
                          </Button>
                          <Button size="sm" variant="outline">
                            {isRTL ? 'مقارنة العروض' : 'Compare'}
                          </Button>
                          <Button size="sm" variant="outline">
                            {isRTL ? 'تفاصيل' : 'Details'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
                
                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                  <h5 className="font-semibold mb-3 text-black">
                    {isRTL ? 'مفتاح الألوان' : 'Legend'}
                  </h5>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-red-500"></div>
                      <span className="text-sm">≤ 7 {isRTL ? 'أيام' : 'days'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                      <span className="text-sm">8-30 {isRTL ? 'أيام' : 'days'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                      <span className="text-sm">31-90 {isRTL ? 'أيام' : 'days'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-green-500"></div>
                      <span className="text-sm">> 90 {isRTL ? 'أيام' : 'days'}</span>
                    </div>
                  </div>
                </div>
                
                {/* Statistics Overlay */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-red-500">3</p>
                      <p className="text-xs text-gray-600">{isRTL ? 'حرجة' : 'Critical'}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-orange-500">5</p>
                      <p className="text-xs text-gray-600">{isRTL ? 'تحذير' : 'Warning'}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-yellow-500">12</p>
                      <p className="text-xs text-gray-600">{isRTL ? 'قريبة' : 'Near'}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-500">28</p>
                      <p className="text-xs text-gray-600">{isRTL ? 'جيدة' : 'Good'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* What-If Analysis */}
      <Card className="border-0 shadow-xl bg-white/95">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-[#3CB593]" />
            {isRTL ? 'تحليل ماذا لو (What-If Analysis)' : 'What-If Analysis'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-black">
                {isRTL ? 'تعديل المعايير' : 'Adjust Criteria'}
              </h4>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    {isRTL ? 'حد التغطية' : 'Coverage Limit'}
                  </label>
                  <Input type="range" min="500000" max="2000000" step="50000" className="w-full" />
                  <p className="text-xs text-gray-500 mt-1">750K - 1.2M SAR</p>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    {isRTL ? 'الخصم' : 'Deductible'}
                  </label>
                  <Input type="range" min="1000" max="10000" step="500" className="w-full" />
                  <p className="text-xs text-gray-500 mt-1">2K - 8K SAR</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-black">
                {isRTL ? 'الأثر المالي' : 'Financial Impact'}
              </h4>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm text-green-700">
                    {isRTL ? 'وفورات متوقعة' : 'Expected Savings'}
                  </p>
                  <p className="text-xl font-bold text-green-800">342K SAR</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-700">
                    {isRTL ? 'إجمالي الأقساط الجديدة' : 'New Total Premiums'}
                  </p>
                  <p className="text-xl font-bold text-blue-800">1.8M SAR</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-black">
                {isRTL ? 'حالة الامتثال' : 'Compliance Status'}
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm">{isRTL ? 'ممتثل' : 'Compliant'}</span>
                  <Badge className="bg-green-100 text-green-800">89%</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm">{isRTL ? 'انتهاك ناعم' : 'Soft Violation'}</span>
                  <Badge className="bg-yellow-100 text-yellow-800">8%</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm">{isRTL ? 'انتهاك صعب' : 'Hard Violation'}</span>
                  <Badge className="bg-red-100 text-red-800">3%</Badge>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline">
              {isRTL ? 'إعادة تعيين' : 'Reset'}
            </Button>
            <Button className="bg-gradient-to-r from-[#3CB593] to-[#2da574]">
              {isRTL ? 'حفظ السيناريو' : 'Save Scenario'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GeoExpiriesMap;