const SectionWrapper = ({ children, id, className = "" }) => {
    return (
        <section id={id} className={`py-12 ${className}`}>
            {children}
        </section>
    );
};

export default SectionWrapper;
