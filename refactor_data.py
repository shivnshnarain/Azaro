import os

filepath = "src/components/sections/ProductConfigurator.tsx"

with open(filepath, "r") as f:
    lines = f.readlines()

# Find start and end indices
start_idx = -1
end_idx = -1

for i, line in enumerate(lines):
    if line.startswith("export const PRODUCTS_DATA = ["):
        start_idx = i
    if line.startswith("export const SOLITAIRE_176_DATA = {"):
        end_idx = i
        # find the end of SOLITAIRE_176_DATA
        for j in range(i, len(lines)):
            if lines[j].startswith("};"):
                end_idx = j
                break
        break

if start_idx != -1 and end_idx != -1:
    data_lines = lines[start_idx:end_idx+1]
    rest_lines = lines[:start_idx] + lines[end_idx+1:]
    
    # Create src/data/productsData.ts
    os.makedirs("src/data", exist_ok=True)
    with open("src/data/productsData.ts", "w") as f:
        f.writelines(data_lines)
    
    # Inject import into ProductConfigurator.tsx
    # Find the imports section (after "use client";)
    import_stmt = 'import { PRODUCTS_DATA, DIRECTOR_PRODUCTS, PEARL_112_DATA, LOTUS_114_DATA, ROSE_115_DATA, JASMINE_116_DATA, TULIP_118_DATA, LAVENDER_119_DATA, CROWN_122_DATA, DYNAMIC_123_DATA, FANTASY_124_DATA, CLASSIC_126_DATA, PYRAMID_127_DATA, ROYAL_128_DATA, PLUTO_130_DATA, JUPITER_131_DATA, CHERRY_133_DATA, FLEXI_134_DATA, MIRAZ_135_DATA, VIVA_136_DATA, NOVA_137_DATA, CRYSTAL_138_DATA, AQUA_139_DATA, MOSAIC_140_DATA, ZANTE_141_DATA, SIESTA_142_DATA, GRAVITY_143_DATA, NEBULA_144_DATA, FLINT_145_DATA, SENATE_146_DATA, PRESIDENTIAL_147_DATA, STELLAR_148_DATA, STYLIZE_149_DATA, FAB_150_DATA, MICRO_151_DATA, INKA_152_DATA, SIGNATURE_153_DATA, COSMO_154_DATA, GALLIO_155_DATA, ACHIEVE_156_DATA, ADMIRE_157_DATA, STELLE_158_DATA, VERA_159_DATA, WESLEY_160_DATA, GEORGIA_164_DATA, ITALIA_165_DATA, KINSLEY_161_DATA, ULTIMA_162_DATA, CHICEGO_163_DATA, ZERLINA_166_DATA, MILAN_167_DATA, TRENTO_168_DATA, GENOA_169_DATA, MARKO_170_DATA, SYNERGY_171_DATA, PENTAGON_172_DATA, PRESTON_173_DATA, REGALIA_174_DATA, MONTAGE_175_DATA, SOLITAIRE_176_DATA } from "@/data/productsData";\n'
    
    rest_lines.insert(2, import_stmt)
    
    with open(filepath, "w") as f:
        f.writelines(rest_lines)
    print("Refactoring complete.")
else:
    print("Indices not found.", start_idx, end_idx)
