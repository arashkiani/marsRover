# The Problem
Write a software to help _US Space Force_ takeover Mars

# Tests

| Coordinations | Commands      | Output     |
| --------------|---------------|------------|
| 1 1 E         | RFRFRFRF      | 1 1 E      |
| 3 2 N         | FRRFLLFFRRFLL | 3 3 N LOST |
| 0 3 W         | LLFFFLFLFL    | 2 3 S      |

# Here is how I assume it should be done

* First things first ! to make this robots more relistic we going to call them Rover! and yes there is such a thing as Rover Launcher [Here is a Youtube video](https://www.youtube.com/watch?v=P4boyXQuUIw)
* Rover Launcher need to have an updatable __frameware__, and __OS__, (This way we can update functionality from earth ! )
    * Rover Launcher OS: Small software to load frameware, keep record of failures, and Radar to mesure the size of the planet (since this modules if not ready we are going to set value for testing)
    * Frameware: This will be loaded into Rover and can be updated with new functionalities later on
* Initiate the project and install tools :)

## OS Functionalities

* Set World size
* Update frameware
* Keep record of robot scents, in order to prevent further incidents 

## Frameware Functionalities

* controls : input(orientation, coordinate, commands), scent of other robots, lost flag
* interpreter to convert text to workable input types
* loop through commands and send them to __Move function__ or __orientate function__
* output getter to transfer result into rover launcher