import sys

def main():
    logs = []
    filename = sys.argv[1]
    f = open(filename, 'r')
    parsed = open(filename + ".parsed", 'w+')

    for line in f:
        if " right:" in line:
            parsed.write(line.split(")] \" ")[1].split("\", source")[0]
                    + "\n")

if __name__ == "__main__":
    main()        
