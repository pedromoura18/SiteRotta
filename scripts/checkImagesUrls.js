import { productsData } from '../src/data/site.js'

async function checkImages() {
  console.log('Total local products:', productsData.length)
  for (const p of productsData) {
    console.log(`Product: ${p.id} (${p.name})`)
    for (const img of p.images) {
      try {
        const res = await fetch(img, { method: 'HEAD', headers: { 'User-Agent': 'Mozilla/5.0' } })
        console.log(`  [${res.status}] ${img.substring(0, 80)}...`)
      } catch (err) {
        console.log(`  [ERR: ${err.message}] ${img.substring(0, 80)}...`)
      }
    }
  }
}

checkImages()
