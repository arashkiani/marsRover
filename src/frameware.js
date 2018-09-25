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
		if (coordinates.x > 50 || coordinates.y > 50) {
			throw new Error(
				'This Rover cannot receive such coordinates Please update frameware'
			)
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
	move(command) {
		let { x, y } = this.coordinate
		let action = 0
		// right now its always forward
		if (command === 'F') {
			action = 1
		}
		// I think I'm starting to over think this...
		if (command === 'B') {
			action = -1
		}
		switch (this.orientation) {
			case 'N':
				y += action
				break
			case 'S':
				y -= action
				break
			case 'W':
				x -= action
				break
			case 'E':
				x += action
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
			} else if (['F', 'H', 'B'].includes(command) && !this.lost) {
				this.move(command)
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
