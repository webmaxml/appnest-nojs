import IRouter from 'types/interfaces/classes/IRouter'

class Some implements IRouter {
  public name: string;

  constructor(name: string) {
    this.name = name
  }

  setName(name: string): void {
    this.name = name
  }
}

export default Some
