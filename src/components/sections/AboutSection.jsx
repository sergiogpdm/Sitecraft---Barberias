import Container from "../Container.jsx";

export default function AboutSection({ data = {} }) {
    const {
        kicker = "Quién soy",
        title = "Más que un corte, una identidad.",
        text = "Cada detalle importa. El objetivo no es simplemente cortar el pelo, sino crear una imagen que encaje contigo, con tu estilo y con la forma en la que quieres verte cada día. Un espacio donde el cuidado personal se convierte en experiencia.",
        secondText = "Trabajo desde la precisión, la estética y la atención al detalle para conseguir resultados limpios, modernos y naturales. Sin prisas, sin plantillas y cuidando cada sesión como algo único.",
        image = "/images/about.jpg",
        brandName = "",
    } = data;

    return (
        <section className="about-pro-section" id="about">
            <Container wide>
                <div className="about-pro-layout">
                    {/* IMAGE */}
                    <div className="about-pro-image-wrap">
                        <div className="about-pro-image-card">
                            <img src={image} alt={title} className="about-pro-image" />
                        </div>
                    </div>

                    {/* CONTENT */}
                    <div className="about-pro-content">
                        <div className="about-pro-kicker">{kicker}</div>

                        <h2 className="about-pro-title">{title}</h2>

                        <div className="about-pro-line" />

                        <p className="about-pro-text">{text}</p>

                        <p className="about-pro-text about-pro-text-secondary">
                            {secondText}
                        </p>

                        <div className="about-pro-signature">
                            <span>— {brandName}</span>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}