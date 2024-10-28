import prismaClient from "../../prisma";

class ListOrderService {
	async execute() {
		const orders = await prismaClient.order.findMany({
			where: {
				draft: false,
				status: false,
			},
			orderBy: {
				created_at: "desc",
			},
			include: {
				items: {
					include: {
						product: {
							// Supondo que a chave estrangeira na tabela de itens seja 'product'
							select: {
								name: true,
								banner: true,
								// Outros campos de 'product' que você desejar
							},
						},
					},
				},
			},
		});

		const productsWithBannerUrl = orders.map((order) => {
			return {
				...order,
				items: order.items.map((item) => {
					return {
						...item,
						product: {
							...item.product,
							banner: `${process.env.BASE_URL}/files/${item.product.banner}`,
						},
					};
				}),
			};
		});

		return productsWithBannerUrl;
	}
}

export { ListOrderService };
