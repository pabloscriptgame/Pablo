from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
import time
import random

# Configuração para parecer mais humano (o máximo que dá pra fazer em 2026)
chrome_options = Options()
chrome_options.add_argument("--disable-blink-features=AutomationControlled")   # esconde que é selenium
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")
chrome_options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36")
chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
chrome_options.add_experimental_option('useAutomationExtension', False)

# Inicia o navegador
service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service, options=chrome_options)

# Remove a flag que denuncia automação (funciona em muitas versões recentes)
driver.execute_cdp_cmd("Page.addScriptToEvaluateOnNewDocument", {
    "source": """
        Object.defineProperty(navigator, 'webdriver', {
            get: () => undefined
        })
    """
})

URL = "https://www.degusto.store"

try:
    print("Acessando o site...")
    driver.get(URL)
    
    # Espera realista (como um humano demoraria)
    time.sleep(random.uniform(4.5, 9.0))
    
    # =============================================
    # Exemplos de JavaScript que você pode executar na página
    # =============================================
    
    # 1. Mostra o título da página (só pra testar)
    titulo = driver.execute_script("return document.title;")
    print("Título da página:", titulo)
    
    # 2. Scroll suave até o final da página (comum em bots "bons")
    print("Fazendo scroll...")
    driver.execute_script("window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'});")
    time.sleep(random.uniform(2.5, 5.0))
    
    # 3. Volta um pouco pra cima (mais natural)
    driver.execute_script("window.scrollBy(0, -300);")
    time.sleep(random.uniform(1.2, 3.0))
    
    # 4. Exemplo: clica em algum elemento se existir (descomente e ajuste o seletor!)
    # try:
    #     botao = driver.find_element(By.CSS_SELECTOR, "a[href*='cardapio']")  # exemplo
    #     driver.execute_script("arguments[0].click();", botao)
    #     print("Clicou em algum link!")
    #     time.sleep(random.uniform(4, 8))
    # except:
    #     print("Elemento não encontrado")
    
    # 5. Mostra quantos produtos/hambúrgueres aparecem na tela (exemplo)
    quantidade = driver.execute_script("""
        return document.querySelectorAll('.product-item, .menu-item, [class*="produto"]').length;
    """)
    print(f"Quantidade aproximada de itens visíveis: {quantidade}")
    
    # Tempo extra na página (finge que está olhando o cardápio)
    print("Ficando mais um pouco na página...")
    time.sleep(random.uniform(10, 25))

    print("Visita concluída!")

except Exception as e:
    print("Erro durante a execução:", str(e))

finally:
    # Fecha o navegador
    driver.quit()
    print("Navegador fechado.")