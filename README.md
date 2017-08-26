# hack-my-store

This project is all about controlling my awning from a raspberry pi and simple electronics...
the whole story in coming

## Reset everything on boot time
edit (as root) /etc/rc.local and add /home/pi/node/reset.sh before "exit 0" 
try to reboot and check with `gpio readall` to see if pin 11,13,15 are in `OUT` mode and `0` value
