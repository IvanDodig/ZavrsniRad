class AuthLog:
    def __init__(self, vrijeme, tip, poruka):
        self.vrijeme = vrijeme
        self.tip = tip
        self.poruka = poruka

logs = []
with open("radius.log", "r") as file:
    for line in file:
        niz = line.split()
        vrijeme = niz[0] + " " + niz[1] + " " + niz[2] + " " + niz[3] + " " + niz[4]
        tipPoruke = niz[6][:-1]
        porukaNiz = niz[7:]
        poruka = ""
        for por in porukaNiz:
            poruka += por + " "
        logs.append(AuthLog(vrijeme,tipPoruke,poruka))




AuthPoruke = [] 
WarningPoruke = []
InfoPoruke = []
ErrorPoruke = []
ProxyPoruke = []  
rand= []
for log in logs:
    if log.tip == "Auth":
        AuthPoruke.append(log)
    elif log.tip == "Warning":
        WarningPoruke.append(log)
    elif log.tip == "Info":
        InfoPoruke.append(log)
    elif log.tip == "ERROR" or log.tip == "Error":
        ErrorPoruke.append(log)
    elif log.tip == "Proxy":
        ProxyPoruke.append(log)
    else:
        rand.append(log)

for auth in AuthPoruke[0:15]:
    """ Prvi dio auth loga """
    prviDio = auth.poruka.split("[")[0]
    """ Drugi dio auth loga """
    drugiDio = auth.poruka.split("[")[1]

    brojLoga = prviDio.split()[0][1:-1]

    logininfo = (prviDio.split(")",1)[1]).split('(',1)
 
    """ Prvi dio poruke je gotov s definiranjem prijave koja vraca inf tipa Login OK a razlog odbijanja vraca inf ukoliko je neuspješna """
    if len(logininfo) > 1:
        loginSucces = logininfo[0]
        failureMsg = logininfo[1].split("):")[0]
    else:
        loginSucces = logininfo[0].split(":")[0]
        failureMsg = None
    
    user = drugiDio.split("]")[0]

    drugiDioNastavak = drugiDio.split("]")[1]
    client = drugiDioNastavak.split()[2]
    port = (drugiDioNastavak.split()[3] + " " + drugiDioNastavak.split()[4]).split(')')[0]
    end = drugiDioNastavak.split()[5:]
    if len(end) == 0:
        cli = None
        tunnelTLS = False
    elif end[0] == 'via':
        tunnelTLS = True
        cli = None
    else:
        cli = end[1].split(")")[0]
        if len(end) > 3:
            tunnelTLS = True
        else:
            tunnelTLS = False

