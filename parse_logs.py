import sys
import csv

def main():
    mpds = []
    generation_count = 1
    filename = sys.argv[1]
    f = open(filename, 'r')
    lines = f.readlines()
    score = 0
    for i, line in enumerate(lines):
        if " SCORE " in line:
          score = score + int(line.split("SCORE ")[1].split(" ")[0].strip())
          # Reset species count if at end of group
          if "SCORE " not in lines[i+2]:
            mpds.append(score)
            score = 0 
            generation_count = 1


    with open(filename.split('.log')[0] + "Score.csv", 'w+') as csvfile:
        writer = csv.writer(csvfile)

        for mpd in mpds:
            # Detect start of generation
            writer.writerow("score: " + str(mpd))

if __name__ == "__main__":
    main()        
