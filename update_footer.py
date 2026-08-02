import re

def update_footer_css():
    with open('src/components/layout/Footer.module.css', 'r') as f:
        content = f.read()

    # 1. Remove chair wrappers and related media queries
    # Using regex to remove blocks
    # It's easier to just do string replacements for known blocks, but they span many lines.
    
    # We will build a completely new string for simplicity since we know exactly what should be there.
    # Let's write the new CSS entirely.
    
    new_css = """
.footer {
  background-color: #FFFFFF;
  padding: 100px 0 40px 0;
  position: relative;
  overflow: visible;
}

.footerContainer {
  position: relative;
  z-index: 30;
}

.grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1.5fr;
  gap: 60px;
  margin-bottom: 80px;
}

@media (max-width: 1024px) {
  .grid {
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }
}

@media (max-width: 640px) {
  .grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}

.brandCol {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.sroLogo {
  max-width: 160px;
  height: auto;
  display: block;
}

.brandDesc {
  font-family: var(--font-body);
  font-size: 14px;
  line-height: 1.6;
  color: #555555;
  opacity: 1;
}

.catalogBtn {
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #111111;
  background-color: #F8F8F8;
  padding: 14px 28px;
  border-radius: var(--radius-full);
  align-self: flex-start;
  box-shadow: var(--shadow-subtle);
  border: 1px solid transparent;
  transition: all 0.3s ease;
  cursor: pointer;
}

.catalogBtn:hover {
  background-color: #D71920;
  border-color: #D71920;
  color: #FFFFFF;
  transform: translateY(-2px);
}

.linkCol {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.colTitle {
  font-size: 16px;
  font-weight: 800;
  text-transform: uppercase;
  color: #111111;
}

.linkList {
  display: flex;
  flex-direction: column;
  gap: 12px;
  list-style: none;
}

.linkItem a {
  font-family: var(--font-body);
  font-size: 14px;
  color: #555555;
  opacity: 1;
  transition: color var(--transition-fast);
  cursor: pointer;
}

.linkItem a:hover {
  color: #D71920;
}

.companyList {
  display: flex;
  flex-direction: column;
  gap: 16px;
  list-style: none;
}

.companyItem {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: var(--font-body);
  font-size: 14px;
  color: #555555;
  opacity: 1;
}

.checkIcon {
  color: #D71920;
  flex-shrink: 0;
}

.bottomBar {
  padding-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

@media (max-width: 640px) {
  .bottomBar {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }
}

.copyright {
  font-family: var(--font-body);
  font-size: 13px;
  color: #777777;
  opacity: 1;
}

.credit {
  font-family: var(--font-body);
  font-size: 13px;
  display: flex;
  gap: 6px;
  align-items: center;
}

.creditText {
  color: #777777;
  opacity: 1;
}

.creditLink {
  color: #111111;
  font-weight: 700;
  text-decoration: none;
  position: relative;
  transition: color 0.3s ease;
  cursor: pointer;
}

.creditLink::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 1px;
  bottom: -2px;
  left: 0;
  background-color: #D71920;
  transform: scaleX(0);
  transform-origin: bottom right;
  transition: transform 0.3s ease;
}

.creditLink:hover {
  color: #D71920;
}

.creditLink:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}
"""
    with open('src/components/layout/Footer.module.css', 'w') as f:
        f.write(new_css.strip() + "\\n")
        
    print("Done")

update_footer_css()
