// DEBUG VERZE - R-fitness Návsí JavaScript

console.log('🔧 DEBUG: Script loading...');

// Kontrola základních elementů
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 DEBUG: DOM loaded');
    
    // 1. KONTROLA HTML STRUKTURY
    const statNumbers = document.querySelectorAll('.stat-number');
    console.log('🔧 DEBUG: Found .stat-number elements:', statNumbers.length);
    
    statNumbers.forEach((stat, index) => {
        console.log(`🔧 DEBUG: Stat ${index}:`, {
            element: stat,
            dataTarget: stat.getAttribute('data-target'),
            textContent: stat.textContent,
            classes: stat.className
        });
    });

    // 2. KONTROLA HERO STATS KONTEJNERU
    const heroStats = document.querySelector('.hero-stats');
    console.log('🔧 DEBUG: Hero stats container:', heroStats);

    // 3. KONTROLA STAT KONTEJNERŮ
    const stats = document.querySelectorAll('.stat');
    console.log('🔧 DEBUG: Found .stat elements:', stats.length);

    // 4. TESTOVACÍ ANIMACE - JEDNODUCHÉ ŘEŠENÍ
    console.log('🔧 DEBUG: Starting simple counter test...');
    
    // Jednoduchá testovací verze
    function simpleCounterTest() {
        statNumbers.forEach((counter, index) => {
            const target = parseInt(counter.getAttribute('data-target'));
            console.log(`🔧 DEBUG: Processing counter ${index}, target: ${target}`);
            
            if (!target || isNaN(target)) {
                console.error(`🔧 DEBUG: Invalid target for counter ${index}:`, target);
                return;
            }

            // Nastavení základního stylu
            counter.style.minWidth = '100px';
            counter.style.textAlign = 'center';
            counter.style.display = 'inline-block';
            
            let current = 0;
            const increment = target / 50; // 50 kroků
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target + '+';
                    clearInterval(timer);
                    console.log(`🔧 DEBUG: Counter ${index} animation completed`);
                } else {
                    counter.textContent = Math.floor(current) + '+';
                }
            }, 60); // 60ms interval
            
            console.log(`🔧 DEBUG: Started timer for counter ${index}`);
        });
    }

    // Spustit test za 2 sekundy
    setTimeout(() => {
        console.log('🔧 DEBUG: Running simple counter test...');
        simpleCounterTest();
    }, 2000);

    // 5. INTERSECTION OBSERVER TEST
    console.log('🔧 DEBUG: Setting up Intersection Observer...');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const counterObserver = new IntersectionObserver((entries) => {
        console.log('🔧 DEBUG: Intersection Observer triggered, entries:', entries.length);
        
        entries.forEach((entry, index) => {
            console.log(`🔧 DEBUG: Entry ${index}:`, {
                isIntersecting: entry.isIntersecting,
                target: entry.target,
                boundingClientRect: entry.boundingClientRect
            });
            
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                
                console.log(`🔧 DEBUG: Triggering animation for target: ${target}`);
                
                // Zkontrolovat, jestli už animace neběžela
                if (counter.hasAttribute('data-animated')) {
                    console.log('🔧 DEBUG: Animation already ran for this element');
                    return;
                }
                
                counter.setAttribute('data-animated', 'true');
                console.log('🔧 DEBUG: Starting counter animation...');
                
                // Jednoduché animace bez fancy efektů
                let current = 0;
                const increment = target / 60;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        counter.textContent = target + '+';
                        clearInterval(timer);
                        console.log('🔧 DEBUG: Animation completed');
                    } else {
                        counter.textContent = Math.floor(current) + '+';
                    }
                }, 50);
            }
        });
    }, observerOptions);

    // Observe všechny stat numbers
    statNumbers.forEach((stat, index) => {
        console.log(`🔧 DEBUG: Observing stat number ${index}`);
        counterObserver.observe(stat);
    });

    // 6. MANUÁLNÍ TRIGGER TEST
    window.debugTriggerCounters = function() {
        console.log('🔧 DEBUG: Manual trigger called');
        statNumbers.forEach((counter, index) => {
            const target = parseInt(counter.getAttribute('data-target'));
            console.log(`🔧 DEBUG: Manual animation for ${index}, target: ${target}`);
            
            let current = 0;
            const increment = target / 30;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target + '+';
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current) + '+';
                }
            }, 100);
        });
    };

    console.log('🔧 DEBUG: Setup complete. Call debugTriggerCounters() in console to test manually.');
    
    // 7. KONTROLA CSS
    setTimeout(() => {
        statNumbers.forEach((stat, index) => {
            const styles = getComputedStyle(stat);
            console.log(`🔧 DEBUG: Stat ${index} computed styles:`, {
                display: styles.display,
                visibility: styles.visibility,
                opacity: styles.opacity,
                position: styles.position
            });
        });
    }, 1000);
});

// ZÁKLADNÍ FUNKČNOST (zjednodušená verze)
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const body = document.body;

const sunIcon = `<path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>`;
const moonIcon = `<path d="M9 2c-1.05 0-2.05.16-3 .46 4.06 1.27 7 5.06 7 9.54 0 4.48-2.94 8.27-7 9.54.95.3 1.95.46 3 .46 5.52 0 10-4.48 10-10S14.52 2 9 2z"/>`;

let currentTheme = 'dark';
body.setAttribute('data-theme', currentTheme);

function updateThemeIcon(theme) {
    if (themeIcon) {
        if (theme === 'light') {
            themeIcon.innerHTML = moonIcon;
            themeToggle.title = 'Přepnout na tmavý motiv';
        } else {
            themeIcon.innerHTML = sunIcon;
            themeToggle.title = 'Přepnout na světlý motiv';
        }
    }
}

updateThemeIcon(currentTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        themeToggle.classList.add('rotating');
        
        setTimeout(() => {
            body.setAttribute('data-theme', newTheme);
            currentTheme = newTheme;
            updateThemeIcon(newTheme);
        }, 150);
        
        setTimeout(() => {
            themeToggle.classList.remove('rotating');
        }, 600);
    });
}

console.log('🔧 DEBUG: Basic functionality loaded');
