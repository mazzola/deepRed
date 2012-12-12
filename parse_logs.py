import sys
import csv

def main():
    mpds = []
    generation_count = 1
    filename = sys.argv[1]
    f = open(filename, 'r')
    lines = f.readlines()

    for i, line in enumerate(lines):
        if " right:" in line:
            # Check to see if we're in the cluster of MPDs
            if " right:" in lines[i+1] or "Main Genetic Loop" in lines[i+1]:
                right = line.split("right:")[1].split("left")[0].strip()
                left = line.split("left:")[1].split("jump")[0].strip()
                jump = line.split("jump:")[1].split("jumpUp")[0].strip()
                jumpUp = line.split("jumpUp:")[1].split("leftUp")[0].strip()
                leftUp = line.split("leftUp:")[1].split("rightUp")[0].strip()
                rightUp = line.split("rightUp:")[1].split("\", source")[0].strip()

                mpd = []
                mpd.append(generation_count)
                generation_count += 1
                mpd.append(right)
                mpd.append(left)
                mpd.append(jump)
                mpd.append(jumpUp)
                mpd.append(leftUp)
                mpd.append(rightUp)

                mpds.append(mpd)
                # Reset species count if at end of group
                if "Main Genetic Loop" in lines[i+1]:
                    generation_count = 1


    with open(filename.split('.log')[0] + ".csv", 'w+') as csvfile:
        writer = csv.writer(csvfile)

        for mpd in mpds:
            # Detect start of generation
            if mpd[0] is 1:
                writer.writerow("")
                writer.writerow(['', 'right', 'left', 'jump', 'jumpUp', 'leftUp', 'rightUp'])
            writer.writerow(mpd)

if __name__ == "__main__":
    main()        
