"use client";

import { PRODUCTS_DATA, DIRECTOR_PRODUCTS, PEARL_112_DATA, LOTUS_114_DATA, ROSE_115_DATA, JASMINE_116_DATA, TULIP_118_DATA, LAVENDER_119_DATA, CROWN_122_DATA, DYNAMIC_123_DATA, FANTASY_124_DATA, CLASSIC_126_DATA, PYRAMID_127_DATA, ROYAL_128_DATA, PLUTO_130_DATA, JUPITER_131_DATA, CHERRY_133_DATA, FLEXI_134_DATA, MIRAZ_135_DATA, VIVA_136_DATA, NOVA_137_DATA, CRYSTAL_138_DATA, AQUA_139_DATA, MOSAIC_140_DATA, ZANTE_141_DATA, SIESTA_142_DATA, GRAVITY_143_DATA, NEBULA_144_DATA, FLINT_145_DATA, SENATE_146_DATA, PRESIDENTIAL_147_DATA, STELLAR_148_DATA, STYLIZE_149_DATA, FAB_150_DATA, MICRO_151_DATA, INKA_152_DATA, SIGNATURE_153_DATA, COSMO_154_DATA, GALLIO_155_DATA, ACHIEVE_156_DATA, ADMIRE_157_DATA, STELLE_158_DATA, VERA_159_DATA, WESLEY_160_DATA, GEORGIA_164_DATA, ITALIA_165_DATA, KINSLEY_161_DATA, ULTIMA_162_DATA, CHICEGO_163_DATA, ZERLINA_166_DATA, MILAN_167_DATA, TRENTO_168_DATA, GENOA_169_DATA, MARKO_170_DATA, SYNERGY_171_DATA, PENTAGON_172_DATA, PRESTON_173_DATA, REGALIA_174_DATA, MONTAGE_175_DATA, SOLITAIRE_176_DATA, ProductCard, DirectorCard } from "@/components/sections/ProductConfigurator";
import configuratorStyles from "@/components/sections/ProductConfigurator.module.css";
import { useEffect } from "react";

export default function ProductsCatalogue() {
  useEffect(() => {
    // Preload images to avoid delay
    PRODUCTS_DATA.forEach(product => {
      product.colors.forEach(color => {
        const img = new Image();
        img.src = color.imagePath;
      });
    });
    DIRECTOR_PRODUCTS.forEach(product => {
      const img = new Image();
      img.src = product.imagePath;
    });
  }, []);

  return (
    <section id="products" className={configuratorStyles.configuratorSection} style={{ scrollMarginTop: '80px', paddingTop: '40px' }}>
      <div className={configuratorStyles.productsStack}>
        {PRODUCTS_DATA.filter(p => !['sun-132', 'orchid-120', 'lily-121', 'heaven-125', 'mercury-129', 'coral-107', 'emerald-108', 'ivory-109', 'jasper-110', 'opal-111', 'ruby-113', 'daisy-117'].includes(p.id)).map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className={configuratorStyles.directorSeriesContainer}>
        <div className={configuratorStyles.directorSeriesGrid}>
          {DIRECTOR_PRODUCTS.map(product => (
            <DirectorCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <div className={configuratorStyles.productsStack}>
        {PRODUCTS_DATA.filter(p => ['coral-107', 'emerald-108', 'ivory-109', 'jasper-110', 'opal-111'].includes(p.id)).map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className={configuratorStyles.directorSeriesContainer}>
        <div className={configuratorStyles.directorSeriesGrid}>
          <DirectorCard product={PEARL_112_DATA} />
          <div className={configuratorStyles.uploadedImageContainer} style={{ gridColumn: 'span 2' }}>
            <img 
              src="/images/new-uploaded-decoration.jpg" 
              alt="Uploaded Chair Decoration" 
              className={configuratorStyles.uploadedImage} 
              loading="lazy" decoding="async" />
          </div>
        </div>
      </div>
      
      <div className={configuratorStyles.productsStack}>
        {PRODUCTS_DATA.filter(p => p.id === 'ruby-113').map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className={configuratorStyles.directorSeriesContainer}>
        <div className={configuratorStyles.directorSeriesGrid}>
          <DirectorCard product={LOTUS_114_DATA} />
          <DirectorCard product={ROSE_115_DATA} />
          <DirectorCard product={JASMINE_116_DATA} />
        </div>
      </div>

      <div className={configuratorStyles.productsStack}>
        {PRODUCTS_DATA.filter(p => p.id === 'daisy-117').map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className={configuratorStyles.directorSeriesContainer}>
        <div className={configuratorStyles.directorSeriesGrid}>
          <DirectorCard product={TULIP_118_DATA} />
          <div className={configuratorStyles.uploadedImageContainer}>
            <img 
              src="/images/center-decor.jpg" 
              alt="Premium Showcase Image" 
              className={configuratorStyles.uploadedImage} 
              loading="lazy" decoding="async" />
          </div>
          <DirectorCard product={LAVENDER_119_DATA} />
        </div>
      </div>

      <div className={configuratorStyles.productsStack}>
        {PRODUCTS_DATA.filter(p => ['orchid-120', 'lily-121'].includes(p.id)).map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className={configuratorStyles.directorSeriesContainer}>
        <div className={configuratorStyles.directorSeriesGrid}>
          <DirectorCard product={CROWN_122_DATA} />
          <DirectorCard product={DYNAMIC_123_DATA} />
          <DirectorCard product={FANTASY_124_DATA} />
        </div>
      </div>

      <div className={configuratorStyles.productsStack}>
        {PRODUCTS_DATA.filter(p => p.id === 'heaven-125').map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className={configuratorStyles.directorSeriesContainer}>
        <div className={configuratorStyles.directorSeriesGrid}>
          <DirectorCard product={CLASSIC_126_DATA} />
          <DirectorCard product={PYRAMID_127_DATA} />
          <DirectorCard product={ROYAL_128_DATA} />
        </div>
      </div>

      <div className={configuratorStyles.productsStack}>
        {PRODUCTS_DATA.filter(p => p.id === 'mercury-129').map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className={configuratorStyles.directorSeriesContainer}>
        <div className={configuratorStyles.directorSeriesGrid}>
          <DirectorCard product={PLUTO_130_DATA} />
          <div className={configuratorStyles.uploadedImageContainer}>
            <img 
              src="/images/premium-showcase-130-131.png" 
              alt="Premium Showcase Image" 
              className={configuratorStyles.uploadedImage} 
              loading="lazy" decoding="async" />
          </div>
          <DirectorCard product={JUPITER_131_DATA} />
        </div>
      </div>

      <div className={configuratorStyles.productsStack}>
        {PRODUCTS_DATA.filter(p => p.id === 'sun-132').map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className={configuratorStyles.directorSeriesContainer}>
        <div className={configuratorStyles.directorSeriesGrid}>
          <DirectorCard product={CHERRY_133_DATA} />
          <div className={configuratorStyles.uploadedImageContainer}>
            <img 
              src="/images/cherry-flexi-center.png" 
              alt="Premium Showcase Image" 
              className={configuratorStyles.uploadedImage} 
              loading="lazy" decoding="async" />
          </div>
          <DirectorCard product={FLEXI_134_DATA} />
        </div>
      </div>

      <div className={configuratorStyles.directorSeriesContainer}>
        <div className={configuratorStyles.directorSeriesGrid}>
          <DirectorCard product={MIRAZ_135_DATA} />
          <DirectorCard product={VIVA_136_DATA} />
          <DirectorCard product={NOVA_137_DATA} />
        </div>
      </div>

      <div className={configuratorStyles.directorSeriesContainer}>
        <div className={configuratorStyles.directorSeriesGrid}>
          <DirectorCard product={CRYSTAL_138_DATA} />
          <div className={configuratorStyles.uploadedImageContainer}>
            <img 
              src="/images/crystal-aqua-center.png" 
              alt="Premium Showcase Image" 
              className={configuratorStyles.uploadedImage} 
              loading="lazy" decoding="async" />
          </div>
          <DirectorCard product={AQUA_139_DATA} />
        </div>
      </div>

      <div className={configuratorStyles.directorSeriesContainer}>
        <div className={configuratorStyles.directorSeriesGrid}>
          <DirectorCard product={MOSAIC_140_DATA} />
          <DirectorCard product={ZANTE_141_DATA} />
          <DirectorCard product={SIESTA_142_DATA} />
        </div>
      </div>

      <div className={configuratorStyles.directorSeriesContainer}>
        <div className={configuratorStyles.uploadedImageContainer}>
          <img 
            src="/images/mosaic-showcase.png" 
            alt="Premium Showcase Image" 
            className={configuratorStyles.uploadedImage} 
            loading="lazy" decoding="async" />
        </div>
      </div>

      <div className={configuratorStyles.directorSeriesContainer}>
        <div className={configuratorStyles.directorSeriesGrid}>
          <DirectorCard product={GRAVITY_143_DATA} />
          <DirectorCard product={NEBULA_144_DATA} />
          <DirectorCard product={FLINT_145_DATA} />
        </div>
      </div>

      <div className={configuratorStyles.directorSeriesContainer}>
        <div className={configuratorStyles.uploadedImageContainer}>
          <img 
            src="/images/gravity-showcase.jpg" 
            alt="Premium Showcase Image" 
            className={configuratorStyles.uploadedImage} 
            loading="lazy" decoding="async" />
        </div>
      </div>

      <div className={configuratorStyles.directorSeriesContainer}>
        <div className={configuratorStyles.directorSeriesGrid}>
          <DirectorCard product={SENATE_146_DATA} />
          <DirectorCard product={PRESIDENTIAL_147_DATA} />
          <DirectorCard product={STELLAR_148_DATA} />
        </div>
      </div>

      <div className={configuratorStyles.productsStack}>
        <ProductCard product={STYLIZE_149_DATA} />
        <ProductCard product={FAB_150_DATA} />
      </div>

      <div className={configuratorStyles.directorSeriesContainer}>
        <div className={configuratorStyles.directorSeriesGrid}>
          <DirectorCard product={MICRO_151_DATA} />
          <DirectorCard product={INKA_152_DATA} />
          <DirectorCard product={SIGNATURE_153_DATA} />
        </div>
      </div>

      <div className={configuratorStyles.directorSeriesContainer}>
        <div className={configuratorStyles.directorSeriesGrid}>
          <DirectorCard product={COSMO_154_DATA} />
          <div className={configuratorStyles.uploadedImageContainer} style={{ gridColumn: 'span 2' }}>
            <img 
              src="/images/cosmo154-showcase.png" 
              alt="COSMO 154 Showcase Image" 
              className={configuratorStyles.uploadedImage} 
              loading="lazy" decoding="async" />
          </div>
        </div>
      </div>

      <div className={configuratorStyles.directorSeriesContainer}>
        <div className={configuratorStyles.directorSeriesGrid}>
          <DirectorCard product={GALLIO_155_DATA} />
          <DirectorCard product={ACHIEVE_156_DATA} />
          <DirectorCard product={ADMIRE_157_DATA} />
        </div>
      </div>

      <div className={configuratorStyles.productsStack}>
        <ProductCard product={STELLE_158_DATA} />
        <ProductCard product={VERA_159_DATA} />
        <ProductCard product={WESLEY_160_DATA} />
      </div>

      <div className={configuratorStyles.directorSeriesContainer}>
        <div className={configuratorStyles.directorSeriesGrid}>
          <DirectorCard product={KINSLEY_161_DATA} />
          <DirectorCard product={ULTIMA_162_DATA} />
          <DirectorCard product={CHICEGO_163_DATA} />
        </div>
      </div>

      <div className={configuratorStyles.productsStack}>
        <ProductCard product={GEORGIA_164_DATA} />
        <ProductCard product={ITALIA_165_DATA} />
      </div>

      <div className={configuratorStyles.directorSeriesContainer}>
        <div className={configuratorStyles.directorSeriesGrid}>
          <DirectorCard product={ZERLINA_166_DATA} />
          <DirectorCard product={MILAN_167_DATA} />
          <DirectorCard product={TRENTO_168_DATA} />
        </div>
      </div>

      <div className={configuratorStyles.productsStack}>
        <ProductCard product={GENOA_169_DATA} />
        <ProductCard product={MARKO_170_DATA} />
      </div>

      <div className={configuratorStyles.directorSeriesContainer}>
        <div className={configuratorStyles.directorSeriesGrid}>
          <DirectorCard product={SYNERGY_171_DATA} />
          <div className={configuratorStyles.uploadedImageContainer}>
            <img 
              src="/images/showcase-center.png" 
              alt="Café Showcase Image" 
              className={configuratorStyles.uploadedImage} 
              loading="lazy" decoding="async" />
          </div>
          <DirectorCard product={PENTAGON_172_DATA} />
        </div>
      </div>

      <div className={configuratorStyles.directorSeriesContainer}>
        <div className={configuratorStyles.uploadedImageContainer}>
          <img 
            src="/images/bottom-showcase.png" 
            alt="Showcase Image" 
            className={configuratorStyles.uploadedImage} 
            loading="lazy" decoding="async" />
        </div>
      </div>

      <div className={configuratorStyles.directorSeriesContainer}>
        <div className={configuratorStyles.directorSeriesGrid}>
          <DirectorCard product={PRESTON_173_DATA} />
          <DirectorCard product={REGALIA_174_DATA} />
          <DirectorCard product={MONTAGE_175_DATA} />
        </div>
      </div>

      <div className={configuratorStyles.productsStack}>
        <ProductCard product={SOLITAIRE_176_DATA} />
      </div>
    </section>
  );
}
