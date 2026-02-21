import subprocess

# 3-syllable names: Indian market, .com + .in both needed
domains = [
    # Hindi/Sanskrit + service combos (uncommon)
    "suprovat", "karigari", "hastakar", "nipunpro", "dakshpro", "kushalag", "parangat", "nishthit",
    "vishkarma", "karmaveer", "sevakpro", "sevamarg", "kaaryapro", "parishram", "udyampro",
    # Coined blends - Pro/Bid/Fix + suffix
    "probidhub", "bidderhub", "fixerhive", "bidderco", "provador", "bikador", "fixador", "servador",
    "probidly", "bidfinely", "proverify", "provarity", "bidnestly", "fixnestly", "bidently",
    "provolve", "bidvolve", "fixvolve", "servolve", "bidsolve", "fixsolve", "prosolve",
    # Indian-feel brandables
    "yugabid", "yugafix", "yugapro", "kalabid", "kalafix", "kalapro", "navavid", "navafix", "navapro",
    "pranavbid", "hiteshpro", "udaypro", "ujwalpro", "tejaspro", "nupurbid", "mitalipro",
    # Abstract unique coinages
    "zervify", "zervigo", "zerviyo", "servigo", "servify", "fixifly", "bidiflex", "loqufix",
    "vixerly", "viximo", "vixpro", "nixfixo", "bixfixo", "trixfixo", "flixbido", "blixbido",
    "quixpro", "quixfix", "quixbid", "prixbid", "trixbid", "nixpro", "nixbido",
    # Mashup words
    "bidnexus", "fixnexus", "pronexus", "bidorama", "fixorama", "prorama", "bidoverse",
    "fixiverse", "proiverse", "bidoworld", "fixoworld", "proworld", "bidonomy", "fixonomy",
    "profikser", "probidder", "fixxperto", "servperto", "bidperto", "bidekstra", "fixekstra",
    # Indian startup vibe
    "kaamkranti", "sevakranti", "bidkranti", "jugadfix", "jugatbid", "jugadpro",
    "desifix", "desibid", "desipro", "hindifix", "apnabid", "apnafix", "apnapro",
    "gharfix", "gharbid", "gharpro", "lokalfix", "lokalbid", "lokalpro",
    # Unique 3-syllable coinages unlikely to be taken
    "zumibid", "zumipro", "zumifix", "velokfix", "velokbid", "velokpro",
    "trilonix", "trilobid", "trilokfix", "ventufix", "venturaid", "ventubid",
    "meritbid", "meritfix", "meritpro", "validbid", "validfix", "validpro",
    "omnibidly", "snappybid", "rapidbidly", "livebidly", "smartbidly", "clearbidly",
    "smartbidder", "clearbidder", "livebidder", "localbidder", "rapidbidder",
    "ikaibid", "ikaifix", "ikaipro", "tezibid", "tezifix", "tezipro",
    "tezibidder", "teziproly", "chaturpro", "chaturfix", "chaturbid",
    "fairbidder", "truebidder", "bidwala", "bidkarlo", "fixbidder", "bidfixer", "bidmyfix", "quotemyfix", "fixmybid",
    "profixer", "profixit", "servibid", "expertbid", "skillbidder", "taskbidder", "kaamwala", "kaamkarlo", "fixkarlo",
    "fixwala", "sevabid", "bidseva", "sahibid", "sahifix", "sahikaam", "kaamsahi", "kushalpro", "prokushal", "shramikpro",
    "bidvantage", "bidify", "quotify", "bidnova", "fixnova", "pronova", "novafix", "novabid", "aurafix", "aurabid",
    "omnifix", "omnibid", "equibid", "equifix", "bidcrafty", "craftbidder", "bidgenie", "fixgenie", "prokaram",
    "karmapro", "karmabid", "bidkarma", "bidkaro", "fixkaro", "prokaro", "bidguru", "fixguru", "proguru",
    "bidmastery", "taskmastery", "proservi", "servipro", "bidkaroo", "fixkaroo", "prokaroo", "bidwalo", "fixwalo",
    "bidbazaar", "fixbazaar", "probazaar", "bidmandi", "fixmandi", "promandi", "bidneta", "fixneta", "proneta",
    "bidyogi", "fixyogi", "proguru", "bidswami", "fixswami", "proswami", "bidmitra", "fixmitra", "promitra",
    "bidbandhu", "fixbandhu", "probandhu", "bidsakha", "fixsakha", "prosakha", "bidsathi", "fixsathi", "prosathi",
    "bidyodha", "fixyodha", "proyodha", "bidshoor", "fixshoor", "proshoor", "bidveer", "fixveer", "proveer",
    "bidyoddha", "fixyoddha", "proyoddha", "bidshura", "fixshura", "proshura", "bidveera", "fixveera", "proveera",
    "bidshakti", "fixshakti", "proshakti", "bidurja", "fixurja", "prourja", "bidtejas", "fixtejas", "protejas",
    "bidpratap", "fixpratap", "propratap", "bidprakash", "fixprakash", "propratap", "bidjyoti", "fixjyoti", "projyoti",
    "bidkiran", "fixkiran", "prokiran", "bidroshni", "fixroshni", "proroshni", "bidujala", "fixujala", "proujala",
    "bidchamak", "fixchamak", "prochamak", "bidjhalak", "fixjhalak", "projhalak", "bidchamka", "fixchamka", "prochamka",
    "bidchamko", "fixchamko", "prochamko", "bidchamki", "fixchamki", "prochamki", "bidchamke", "fixchamke", "prochamke",
    "bidchamku", "fixchamku", "prochamku", "bidchamk", "fixchamk", "prochamk", "bidcham", "fixcham", "procham",
    "bidcha", "fixcha", "procha", "bidch", "fixch", "proch", "bidc", "fixc", "proc", "bid", "fix", "pro"
]

jackpots = []
only_com = []
print(f"Checking {len(domains)} names... (only printing findings)")
for name in domains:
    try:
        com_res = subprocess.run(["whois", f"{name}.com"], capture_output=True, text=True, timeout=3)
        com_taken = not ("No match" in com_res.stdout or "not found" in com_res.stdout.lower())
        if not com_taken:
            in_res = subprocess.run(["whois", f"{name}.in"], capture_output=True, text=True, timeout=3)
            in_taken = not ("NOT FOUND" in in_res.stdout or "No match" in in_res.stdout
                           or "available" in in_res.stdout.lower() or "not found" in in_res.stdout.lower())
            if not in_taken:
                jackpots.append(name)
                print(f"JACKPOT: {name} — .com AND .in AVAILABLE!")
            else:
                only_com.append(name)
                print(f"PARTIAL: {name} — .com available but .in taken")
    except subprocess.TimeoutExpired:
        pass

print("\n====== SUMMARY ======")
print(f"JACKPOTS (both .com + .in): {len(jackpots)}")
for j in jackpots:
    print(f"  ✅ {j}.com  +  {j}.in")
print(f".COM only available: {len(only_com)}")
for c in only_com:
    print(f"  ⚠️  {c}.com")
print("Done.")
