import prismaClient from "../../prisma";

class GetUsersService {
	async execute() {
		const users = await prismaClient.user.findMany({
			select: {
				name: true,
				email: true,
				admin: true,
			},
		});
		return users;
	}
}

export { GetUsersService };
