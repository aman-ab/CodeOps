export class InvalidTransitionError extends Error {
  constructor(
    public readonly currentStatus: string,
    public readonly requestedStatus: string,
  ) {
    super(
      `Cannot transition order from ${currentStatus} to ${requestedStatus}`,
    );
    this.name = 'InvalidTransitionError';
  }
}
