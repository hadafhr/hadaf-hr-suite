#!/bin/bash

# Initialize Capacitor project
echo "🚀 تهيئة Capacitor للتطبيق المحمول..."

# Run Capacitor init
npx cap init hadaf-hr-suite app.lovable.3a35ea4e52184868bcc6643025691c73 --web-dir=dist

echo "✅ تم تهيئة Capacitor بنجاح!"
echo ""
echo "📋 الخطوات التالية لتشغيل التطبيق على الجهاز:"
echo "1. انقل المشروع إلى GitHub باستخدام زر 'Export to GitHub'"
echo "2. اسحب المشروع من GitHub إلى جهازك المحلي"
echo "3. شغل: npm install"
echo "4. أضف المنصة: npx cap add ios أو npx cap add android"
echo "5. حدث المنصة: npx cap update ios أو npx cap update android"
echo "6. ابني المشروع: npm run build"
echo "7. زامن الملفات: npx cap sync"
echo "8. شغل التطبيق: npx cap run ios أو npx cap run android"
echo ""
echo "📖 للمزيد من التفاصيل: https://lovable.dev/blogs/TODO"