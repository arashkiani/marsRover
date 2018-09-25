export default class frameware {
	orientation = 'N'
	coordinate = { x: 0, y: 0 }
	commands = []
	lost = false
	scent = []
	MaxWorldSize = { x: 0, y: 0 }
	set takeInCoordinates(input) {
		const [x, y, orientation] = input.toUpperCase().split(' ')
		const coordinates = {
			x: parseInt(x, 10),
			y: parseInt(y, 10),
		}
		this.orientation = orientation
		this.coordinate = coordinates
	}
	set takeInCommands(commands) {
		// reset lost flag
		this.lost = false
		// take in commands and make sure its not  more than 100
		this.commands = commands.slice(0, 99).split('')
		this.execute()
	}
	set worldSize(input) {
		const [x, y] = input.split(' ')
		this.MaxWorldSize = { x, y }
	}
	orientate(command) {
		const orientations = ['N', 'E', 'S', 'W']
		const option = orientations.findIndex(i => i === this.orientation)
		if (command === 'R') {
			const index = option === 3 ? 0 : option + 1
			this.orientation = orientations[index]
		}
		if (command === 'L') {
			const index = option === 0 ? 3 : option - 1
			this.orientation = orientations[index]
		}
	}
	move() {
		// right now its always forward
		let { x, y } = this.coordinate
		switch (this.orientation) {
			case 'N':
				x += 1
				break
			case 'S':
				x -= 1
				break
			case 'W':
				y -= 1
				break
			case 'E':
				y += 1
				break
			default:
				console.log('Command not recognised')
		}
		this.ShouldRoverChangeLocation(this.coordinate, { x, y })
	}
	execute() {
		this.commands.forEach((command: string) => {
			if (['R', 'L'].includes(command)) {
				this.orientate(command)
			} else if (['F'].includes(command) && !this.lost) {
				this.move()
			}
		})
	}

	ShouldRoverChangeLocation(current, next): void {
		// Check if we know its dangerous
		const danger = this.scent.includes(`${next.x} ${next.y}`)
		if (!danger) {
			if (
				next.x > this.MaxWorldSize.x ||
				next.x < 0 ||
				next.y > this.MaxWorldSize.y ||
				next.y < 0
			) {
				// If rover fall off declare it lost + add last location to blacklist
				this.lost = true
				this.scent.push(`${next.x} ${next.y}`)
			} else this.coordinate = next
		}
	}

	get output(): string {
		const { x, y } = this.coordinate
		return `${x} ${y} ${this.orientation}${this.lost ? ' LOST' : ''}`
	}
}
