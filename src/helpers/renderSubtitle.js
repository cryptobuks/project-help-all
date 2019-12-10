import _ from 'lodash';
const  DATA =[
    {title_en:'Baby Formula',title_ar:'طعام للاطفال', id:1, cat:1},
    {title_en:'Vitamins',title_ar:'الفيتامينات', id:2, cat:1},
    {title_en:'Diapers',title_ar:'حفاضات',  id:3, cat:1},
    {title_en:'Toys',title_ar:'ألعاب',  id:4, cat:1},
    {title_en:'Clothes',title_ar:'ملابس',  id:5, cat:1},
    {title_en:'OTC Medication',title_ar:'أدوية', id:1, cat:2},
    {title_en:'Antibiotics',title_ar:'مضادات حيوية', id:2, cat:2},
    {title_en:'vitamins',title_ar:'الفيتامينات', id:3, cat:2},
    {title_en:'Rice',title_ar:'أرز', id:1, cat:3},
    {title_en:'Pasta',title_ar:'معكرونة', id:2, cat:3},
    {title_en:'Grains',title_ar:'حبوب', id:3, cat:3},
    {title_en:'Cans',title_ar:'معلبات', id:4, cat:3},
    {title_en:'Feminine Pads',title_ar:'حفاضات نسائية', id:1, cat:4},
    {title_en:'Soap',title_ar:'صابون', id:2, cat:4},
    {title_en:'Toothpaste',title_ar:'معجون الأسنان', id:3, cat:4},
    {title_en:'Toothbrush',title_ar:'فرشاة الأسنان',id:4, cat:4},
    {title_en:'Women Clothes',title_ar:'ملابس النسائية', id:1, cat:5},
    {title_en:'Men Clothes',title_ar:'ملابس رجالية', id:2, cat:5},
    {title_en:'Blankets',title_ar:'حرامات', id:3, cat:5}
  ]
  const renderSubtitle = (input) => {
      const { isEnglish, listing } = input;
      let _key = isEnglish ? 'title_en' : 'title_ar';
      let _comma = isEnglish ? ', ' : '، ';
      let toggledAttributes = _.compact(_.map(listing, (value, key) => {
          return (key.includes('attribute') && value) ? parseInt(key.split('_')[1]) : null;
      }))
      let data = _.filter(DATA, item => {
              return (item.cat === parseInt(listing.category)) && _.includes(toggledAttributes, item.id)
            });
      return {data:data,text:_.map(data, _key).join(_comma)};
};

export default renderSubtitle;
