import Index from "@/components/spec";

const Spec = async ({ params }) => {
	const { id } = await params; // Destructure directly without await
	return (
		<div>
			<Index id={id} />
		</div>
	);
};

export default Spec;
