# دليل استبدال الألوان الشامل | Complete Color Replacement Guide

## جدول الاستبدالات | Replacement Table

### استبدالات CSS وTailwind المباشرة | Direct CSS & Tailwind Replacements

#### الألوان المباشرة | Direct Color Values
```
# الأخضر القديم → الألوان الجديدة
#008C6A  → #b1a086  (البيج) أو #000000 (الأسود) حسب السياق
#00694F  → #000000  (الأسود)
#009F87  → #b1a086  (البيج)
#00B488  → #b1a086  (البيج)

# الرمادي الداكن القديم → الأبيض/البيج الجديد
#1A1A1A  → #ffffff  (الأبيض) للبطاقات
rgba(0, 0, 0, 0.8)  → rgba(255, 255, 255, 0.95)
```

#### فئات Tailwind | Tailwind Classes

##### الخلفيات | Backgrounds
```
bg-black           → bg-background
bg-gray-900        → bg-card
bg-gray-900/60     → bg-card/60
bg-gray-900/40     → bg-card/40
bg-gray-800        → bg-card
bg-gray-800/60     → bg-card/60
bg-gray-700        → bg-muted
bg-black/20        → bg-card/20
bg-black/40        → bg-card/40
bg-black/50        → bg-card/50
```

##### النصوص | Text Colors
```
text-white         → text-foreground
text-gray-900      → text-foreground
text-gray-800      → text-foreground
text-gray-700      → text-muted-foreground
text-gray-600      → text-muted-foreground
text-gray-500      → text-muted-foreground
text-gray-400      → text-muted-foreground
text-gray-300      → text-muted-foreground
text-[#008C6A]     → text-primary (للتأكيد) أو text-foreground (عادي)
```

##### الحدود | Borders
```
border-[#008C6A]   → border-primary أو border-border
border-[#008C6A]/30  → border-border
border-[#008C6A]/40  → border-border
border-gray-900    → border-border
border-gray-800    → border-border
border-gray-700    → border-border
border-gray-600    → border-border
```

##### حالات التفاعل | Interactive States
```
hover:bg-[#008C6A]      → hover:bg-accent
hover:bg-gray-900       → hover:bg-accent
hover:bg-gray-800       → hover:bg-accent
hover:text-[#008C6A]    → hover:text-primary
hover:text-white        → hover:text-foreground
hover:border-[#008C6A]  → hover:border-primary
focus:border-[#008C6A]  → focus:border-primary
focus:ring-[#008C6A]    → focus:ring-primary
```

##### التدرجات | Gradients
```
from-[#008C6A]           → from-primary
to-[#00694F]             → to-primary-glow
via-[#009F87]            → via-primary
bg-gradient-to-r from-[#008C6A] to-[#00694F]  
  → bg-gradient-to-r from-primary to-primary-glow

# تدرجات مخصصة
bg-gradient-to-br from-[#008C6A]/20 via-transparent to-[#008C6A]/10
  → bg-gradient-to-br from-primary/20 via-transparent to-primary/10
```

##### الظلال | Shadows
```
shadow-[#008C6A]/10    → shadow-card
shadow-[#008C6A]/20    → shadow-glow
shadow-[#008C6A]/30    → shadow-hover
shadow-2xl shadow-[#008C6A]/10  → shadow-2xl
```

---

## استبدالات حسب السياق | Context-Based Replacements

### 1. الخلفيات الرئيسية | Main Backgrounds
**القديم:**
```jsx
<div className="min-h-screen bg-black">
```
**الجديد:**
```jsx
<div className="min-h-screen bg-background">
```

### 2. البطاقات والحاويات | Cards & Containers
**القديم:**
```jsx
<Card className="bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30">
```
**الجديد:**
```jsx
<Card className="bg-card backdrop-blur-xl border border-border">
```

### 3. الأزرار الأساسية | Primary Buttons
**القديم:**
```jsx
<Button className="bg-[#008C6A] text-white hover:bg-[#00694F]">
```
**الجديد:**
```jsx
<Button className="bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground">
```

### 4. الأزرار الثانوية | Secondary Buttons
**القديم:**
```jsx
<Button className="bg-gray-900 text-white border border-[#008C6A]">
```
**الجديد:**
```jsx
<Button className="bg-secondary text-secondary-foreground border border-primary">
```

### 5. العناوين والنصوص | Headers & Text
**القديم:**
```jsx
<h2 className="text-white">العنوان</h2>
<p className="text-gray-300">النص الثانوي</p>
```
**الجديد:**
```jsx
<h2 className="text-foreground">العنوان</h2>
<p className="text-muted-foreground">النص الثانوي</p>
```

### 6. أيقونات التأكيد | Accent Icons
**القديم:**
```jsx
<Icon className="text-[#008C6A]" />
```
**الجديد:**
```jsx
<Icon className="text-primary" />
```

### 7. حقول الإدخال | Input Fields
**القديم:**
```jsx
<Input className="bg-black/50 border-[#008C6A]/40 text-white focus:border-[#008C6A]" />
```
**الجديد:**
```jsx
<Input className="bg-input border-border text-foreground focus:border-primary" />
```

### 8. القوائم المنسدلة | Select Dropdowns
**القديم:**
```jsx
<SelectContent className="bg-gray-900 border-[#008C6A]/40">
  <SelectItem className="text-white hover:bg-[#008C6A]/20">
```
**الجديد:**
```jsx
<SelectContent className="bg-popover border-border">
  <SelectItem className="text-popover-foreground hover:bg-accent">
```

### 9. تبويبات نشطة | Active Tabs
**القديم:**
```jsx
<TabsTrigger 
  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#008C6A] data-[state=active]:to-[#00694F]"
>
```
**الجديد:**
```jsx
<TabsTrigger 
  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
>
```

### 10. شارات التنبيه | Badge Components
**القديم:**
```jsx
<Badge className="bg-[#008C6A]/10 text-[#008C6A] border-[#008C6A]/30">
```
**الجديد:**
```jsx
<Badge variant="outline" className="border-border text-foreground">
```

---

## استبدالات inline styles | Inline Style Replacements

### JavaScript/JSX
**القديم:**
```jsx
style={{ background: '#008C6A', color: '#ffffff' }}
style={{ borderColor: '#008C6A' }}
```
**الجديد:**
```jsx
style={{ background: 'var(--color-black)', color: 'var(--color-white)' }}
style={{ borderColor: 'var(--color-gray-1)' }}
```

### backgroundImage في style
**القديم:**
```jsx
style={{
  backgroundImage: 'linear-gradient(135deg, #008C6A, #00694F)'
}}
```
**الجديد:**
```jsx
style={{
  backgroundImage: 'var(--gradient-primary)'
}}
```

---

## ملفات SVG | SVG Files

### تحديث fill و stroke
**القديم:**
```svg
<svg>
  <path fill="#008C6A" stroke="#00694F" />
</svg>
```
**الجديد:**
```svg
<svg>
  <path fill="var(--color-black)" stroke="var(--color-gray-1)" />
  <!-- أو استخدم currentColor لترث لون النص -->
  <path fill="currentColor" stroke="currentColor" />
</svg>
```

---

## أنماط مخصصة في CSS | Custom CSS Styles

### في ملفات .css
**القديم:**
```css
.my-component {
  background-color: #008C6A;
  color: #ffffff;
  border: 1px solid #00694F;
}
.my-component:hover {
  background-color: #00694F;
}
```
**الجديد:**
```css
.my-component {
  background-color: var(--color-black);
  color: var(--color-white);
  border: 1px solid var(--color-gray-1);
}
.my-component:hover {
  background-color: var(--color-gray-1);
  color: var(--color-black);
}
```

---

## استبدالات خاصة بالمكونات | Component-Specific Replacements

### مكونات الحضور والانصراف
```jsx
// من
className="bg-gradient-to-r from-[#008C6A] via-[#009F87] to-[#00694F]"
// إلى
className="bg-gradient-to-r from-primary to-primary-glow"
```

### مكونات الفوتر
```jsx
// من
className="bg-gray-900 text-white"
// إلى
className="bg-primary text-primary-foreground"
```

### مكونات الـHeader
```jsx
// من
className="bg-gradient-to-r from-[#008C6A] to-[#00694F]"
// إلى
className="bg-primary text-primary-foreground"
```

---

## أمثلة كاملة للتحويل | Complete Conversion Examples

### مثال 1: بطاقة موظف
**القديم:**
```jsx
<Card className="bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30">
  <CardHeader className="bg-gradient-to-r from-[#008C6A] to-[#00694F] text-white">
    <CardTitle className="text-white">معلومات الموظف</CardTitle>
  </CardHeader>
  <CardContent className="bg-gray-900/40 text-gray-300">
    <Button className="bg-[#008C6A] text-white hover:bg-[#00694F]">
      تعديل
    </Button>
  </CardContent>
</Card>
```
**الجديد:**
```jsx
<Card className="bg-card backdrop-blur-xl border border-border">
  <CardHeader className="bg-primary text-primary-foreground">
    <CardTitle className="text-primary-foreground">معلومات الموظف</CardTitle>
  </CardHeader>
  <CardContent className="bg-card text-muted-foreground">
    <Button className="bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground">
      تعديل
    </Button>
  </CardContent>
</Card>
```

### مثال 2: نموذج إدخال
**القديم:**
```jsx
<form className="bg-gray-900 p-6 rounded-lg border border-[#008C6A]/30">
  <Input 
    className="bg-black/50 border-[#008C6A]/40 text-white focus:border-[#008C6A]"
    placeholder="أدخل الاسم"
  />
  <Button className="bg-gradient-to-r from-[#008C6A] to-[#00694F] text-white">
    إرسال
  </Button>
</form>
```
**الجديد:**
```jsx
<form className="bg-card p-6 rounded-lg border border-border">
  <Input 
    className="bg-input border-border text-foreground focus:border-primary"
    placeholder="أدخل الاسم"
  />
  <Button className="bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground">
    إرسال
  </Button>
</form>
```

---

## أولويات الاستبدال | Replacement Priorities

### أولوية عالية (فوري)
1. ✅ `src/components/Breadcrumb.tsx` - مكتمل
2. 🔄 `src/components/EndOfServiceCalculator.tsx` - قيد العمل
3. ⏳ `src/components/PricingCalculator.tsx` - معلق
4. ⏳ `src/components/SubscriptionCalculator.tsx` - معلق
5. ⏳ جميع ملفات `src/components/ui/` - معلق

### أولوية متوسطة
- جميع ملفات `src/components/attendance/`
- جميع ملفات `src/components/systems/`
- جميع ملفات `src/pages/`

### أولوية منخفضة
- ملفات الاختبار
- ملفات التوثيق
- ملفات الأمثلة

---

## أدوات المساعدة | Helper Tools

### البحث عن الألوان القديمة
```bash
# البحث عن جميع الألوان القديمة
grep -r "#008C6A" src/
grep -r "#00694F" src/
grep -r "gray-900" src/ --include="*.tsx" --include="*.jsx"

# عد الألوان القديمة
grep -r "#008C6A" src/ | wc -l
```

### استبدال جماعي (استخدم بحذر)
```bash
# استبدال في جميع ملفات TSX
find src/ -name "*.tsx" -exec sed -i 's/#008C6A/var(--color-black)/g' {} +
find src/ -name "*.tsx" -exec sed -i 's/text-white/text-foreground/g' {} +
```

---

## نصائح مهمة | Important Tips

1. **دائماً اختبر بعد التغيير** - تأكد من أن الألوان تعمل بشكل صحيح
2. **راجع السياق** - بعض الألوان قد تحتاج معاملة خاصة
3. **استخدم المتغيرات** - لا تستخدم ألوان مباشرة
4. **تحقق من التباين** - تأكد من وضوح النصوص
5. **اختبر الحالات المختلفة** - hover, focus, disabled, error

---

**آخر تحديث**: 2025-01-XX
**الحالة**: قيد التنفيذ
