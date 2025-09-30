# نظام الألوان النهائي - Final Color System
## تاريخ التطبيق: 2025-01-XX

---

## لوحة الألوان الرسمية | Official Color Palette

### متغيرات CSS الأساسية | Core CSS Variables
```css
:root {
  --color-black: #000000;        /* الأسود الملكي */
  --color-beige: #b1a086;        /* البيج الرملي - الخلفية الرئيسية */
  --color-gray-1: #cfcbcb;       /* الرمادي الفاتح */
  --color-gray-2: #e8e4e0;       /* الرمادي المائل للأبيض */
  --color-white: #ffffff;        /* الأبيض الثلجي */
}
```

### قيم HSL لـ Tailwind | HSL Values for Tailwind
```css
--background: 36 24% 61%;           /* #b1a086 */
--foreground: 0 0% 0%;              /* #000000 */
--card: 0 0% 100%;                  /* #ffffff */
--card-foreground: 0 0% 0%;         /* #000000 */
--primary: 0 0% 0%;                 /* #000000 */
--primary-foreground: 0 0% 100%;    /* #ffffff */
--secondary: 0 0% 100%;             /* #ffffff */
--secondary-foreground: 0 0% 0%;    /* #000000 */
--muted: 0 3% 80%;                  /* #cfcbcb */
--muted-foreground: 30 17% 89%;     /* #e8e4e0 */
--accent: 0 3% 80%;                 /* #cfcbcb */
--accent-foreground: 0 0% 0%;       /* #000000 */
--border: 0 3% 80%;                 /* #cfcbcb */
```

---

## قواعد الاستخدام | Usage Rules

### 1. الخلفيات | Backgrounds
- **الخلفية الرئيسية للصفحات**: `var(--color-beige)` أو `bg-background`
- **خلفية البطاقات والمودالات**: `var(--color-white)` أو `bg-card`
- **الخلفيات الثانوية**: `var(--color-gray-1)` أو `bg-muted`

### 2. النصوص | Typography
- **العناوين الرئيسية (H1, H2, H3)**: `var(--color-black)` أو `text-foreground`
- **النصوص الثانوية والوصف**: `var(--color-gray-2)` أو `text-muted-foreground`
- **Placeholders**: `var(--color-gray-2)` أو `placeholder:text-muted-foreground`

### 3. الحدود والفواصل | Borders & Dividers
- **الحدود الرئيسية**: `var(--color-gray-1)` أو `border-border`
- **الحدود عند التركيز**: `var(--color-black)` أو `focus:border-primary`

### 4. الأزرار | Buttons

#### Primary Buttons
```css
.btn-primary {
  background: var(--color-black);
  color: var(--color-white);
  border: 1px solid transparent;
}
.btn-primary:hover {
  background: var(--color-gray-1);
  color: var(--color-black);
}
```

#### Secondary Buttons
```css
.btn-secondary {
  background: var(--color-white);
  color: var(--color-black);
  border: 1px solid var(--color-black);
}
.btn-secondary:hover {
  background: var(--color-gray-1);
}
```

---

## أمثلة الاستخدام | Usage Examples

### HTML/JSX
```jsx
<div className="bg-background text-foreground">
  <div className="bg-card border border-border rounded-lg p-6">
    <h2 className="text-foreground font-bold">عنوان رئيسي</h2>
    <p className="text-muted-foreground">نص ثانوي</p>
    <button className="bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground">
      زر أساسي
    </button>
  </div>
</div>
```

### Pure CSS
```css
.my-component {
  background: var(--color-beige);
  color: var(--color-black);
  border: 1px solid var(--color-gray-1);
}
```

---

## الألوان المحظورة | Forbidden Colors

**⚠️ تحذير صارم: لا تستخدم الألوان التالية نهائياً**

### الألوان القديمة المحذوفة:
- ❌ `#008C6A` (الأخضر القديم)
- ❌ `#00694F` (الأخضر الداكن القديم)
- ❌ `#009F87` (الأخضر المتوسط القديم)
- ❌ `#00B488` (الأخضر الفاتح القديم)
- ❌ أي درجات من `gray-900`, `gray-800`, `gray-700` بدون استخدام نظام التصميم

### كيفية التحقق:
```bash
# البحث عن الألوان القديمة
grep -r "#008C6A" src/
grep -r "#00694F" src/
grep -r "gray-900" src/
```

---

## اختبارات الجودة | QA Checklist

### ✅ الصفحات المطلوب اختبارها:
- [ ] الصفحة الرئيسية
- [ ] لوحة التحكم
- [ ] صفحات الموظفين
- [ ] صفحات الإعدادات
- [ ] صفحات النماذج
- [ ] صفحات المدفوعات
- [ ] صفحة تسجيل الدخول
- [ ] صفحة 404
- [ ] المودالات والـDialogs
- [ ] القوائم المنسدلة

### ✅ المكونات المطلوب اختبارها:
- [ ] Navbar
- [ ] Sidebar
- [ ] Cards
- [ ] Buttons (جميع الأنواع)
- [ ] Forms & Inputs
- [ ] Tables
- [ ] Modals
- [ ] Tooltips
- [ ] Alerts & Notifications
- [ ] Badges
- [ ] Footer

### ✅ حالات التفاعل:
- [ ] Hover states
- [ ] Active states
- [ ] Focus states
- [ ] Disabled states
- [ ] Error states
- [ ] Loading states

---

## الملفات الرئيسية المعدلة | Modified Core Files

1. **src/index.css** - نظام الألوان الأساسي
2. **tailwind.config.ts** - تكوين Tailwind
3. **src/components/ui/button.tsx** - مكون الأزرار
4. **src/pages/ComprehensiveEmployeeManagement.tsx** - صفحة إدارة الموظفين

---

## التوافق والوصولية | Accessibility

### نسب التباين | Contrast Ratios
- نص أسود (#000000) على خلفية بيج (#b1a086): **7.4:1** ✅ (WCAG AAA)
- نص أبيض (#ffffff) على خلفية سوداء (#000000): **21:1** ✅ (WCAG AAA)
- نص رمادي 2 (#e8e4e0) على خلفية أبيض (#ffffff): **1.4:1** ⚠️ (يجب استخدامه للنصوص الثانوية فقط)

### اختبارات مطلوبة:
- [ ] اختبار قارئ الشاشة
- [ ] اختبار التباين اللوني
- [ ] اختبار عمى الألوان
- [ ] اختبار RTL/LTR

---

## ملاحظات المطور | Developer Notes

### عند إضافة مكون جديد:
1. استخدم متغيرات CSS فقط (`var(--color-*)`)
2. استخدم فئات Tailwind الدلالية (`bg-background`, `text-foreground`)
3. تجنب الألوان المباشرة في JSX
4. اختبر جميع الحالات (hover, focus, disabled)

### عند تعديل مكون قائم:
1. ابحث عن جميع الألوان القديمة
2. استبدلها بالمتغيرات الجديدة
3. تحقق من حالات التفاعل
4. اختبر على شاشات مختلفة

---

## تواريخ التحديث | Update History

- **2025-01-XX**: إطلاق النظام النهائي للألوان
- **التعديلات**: تم استبدال جميع الألوان القديمة بالنظام الجديد

---

## جهة الاتصال | Contact

للأسئلة حول نظام الألوان أو للإبلاغ عن ألوان قديمة، يرجى التواصل مع فريق التطوير.

**تحذير قانوني**: أي استخدام للألوان القديمة المحذوفة يعتبر مخالفة صريحة لمواصفات المشروع.
