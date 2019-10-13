abstract class Command {
  abstract identifier: string;

  abstract async execute(): Promise<void>;

  abstract async postExecute(): Promise<void>;
}

export { Command };
