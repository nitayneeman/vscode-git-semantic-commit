abstract class Command {
  abstract identifier: string;

  abstract execute(): Promise<void>;
}

export { Command };
