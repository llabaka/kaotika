interface PropsContainer {
    props: 
}

const CardContainer = ({props} ) => {

    return(
        <div className="w-[100%] relative h-[23rem] flex flex-row">
            <Image
                src={CardImageRoute}
                alt="MainNavigator"
                fill
                sizes='(max-width: 435px) 100vw'
                className="z-0"
            />
            {/* LEFT CONTAINER */}
            <div className="flex flex-col relative w-[65%] h-[100%] items-center">
                {/* DIV LEVEL */}
                <div className="z-10 relative flex flex-row p-2 justify-between items-center w-[100%] h-[16%]">
                    <p className="text-white text-[25px] font-bold mt-1 ml-4">{props.min_lvl}</p>
                    <div className="flex justify-around w-4/12 mt-5 ml-8">
                        <p className="text-white text-[25px] font-bold">{props.value}</p>
                        <Image src={GoldIcon} width={20} height={20} alt="gold icon" />
                    </div>

                    <Image
                        src={icon}
                        width={128}
                        height={28}
                        alt="Equipment icon"
                        className="rounded-full relative top-1 left-1.5 w-[18%]"
                    />
                </div>

                {/* IMAGE DIV */}
                <div className="flex-col flex justify-center items-center h-[45%] w-[65%] ">
                    <div className="h-[100%] w-[100%] flex relative items-center justify-center">
                        <Image 
                            src={props.image} 
                            alt="Equipment Image"
                            fill
                        />
                    </div>
                </div>
                {/* NAME, DESCRIPTION BUTTONS DIV */}
                <div className="h-[10%] text-black text-lg font-bold flex items-center justify-center mt-2">
                    <p>{props.name}</p>
                </div>
                <div className="h-[14%] text-[22px] flex content-center justify-center overflow-hidden w-[87%]">
                    <p className="line-clamp-none overflow-y-auto " 
                        style={{
                            overflowY: "scroll",
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                        }}> 
                    {props.description}</p>
                </div>
                <div className="h-[12%] w-[100%] flex justify-around">
                    <button className="text-white text-xl ml-5 w-2/6 rounded-full flex items-center justify-center">Add Basket</button>
                    <button className="text-white text-xl mr-6 w-2/6 rounded-full flex items-center justify-center">Buy</button>
                </div>
            </div>
            {/* CARD RIGHT CONTAINER */}
            
            { props.modifiers !== undefined ? ( 
                <CardRigthContainer attributes={props.modifiers} extra_attribute={extraAtribute} weaponDie={weaponDamage} baseDamage={baseDamage}/>
            ) : null }
            { isEquipment === false ? null : (
                <EffectsContainer/>
            )}
    </div>
    )
}

export default CardContainer;