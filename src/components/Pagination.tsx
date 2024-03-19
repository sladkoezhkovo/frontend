import { Button, ButtonGroup, Flex } from '@chakra-ui/react'

interface props {
    page: number
    maxPage: number
    setPage: (p: number) => void
}

const Pagination = ({ maxPage, setPage, page }: props) => {
    const canNext = page < maxPage
    const canPrev = page > 1

    // console.log('page:', page, 'canPrev:', canPrev(), 'canNext:', canNext())

    return (
        <Flex>
            {maxPage == 1 ? (
                <Button>{page}</Button>
            ) : (
                <ButtonGroup>
                    <Button
                        isDisabled={page == 1}
                        variant="outline"
                        onClick={() => setPage(1)}
                    >
                        1
                    </Button>
                    <Button
                        variant="outline"
                        isDisabled={!canPrev}
                        onClick={() => setPage(page - 1)}
                    >
                        {'<'}
                    </Button>
                    <Button variant="ghost" disabled={true}>
                        {page}
                    </Button>
                    <Button
                        variant="outline"
                        isDisabled={!canNext}
                        onClick={() => canNext && setPage(page + 1)}
                    >
                        {'>'}
                    </Button>
                    <Button
                        isDisabled={page == maxPage}
                        variant="outline"
                        onClick={() => setPage(maxPage)}
                    >
                        {maxPage}
                    </Button>
                </ButtonGroup>
            )}
        </Flex>
    )
}

export default Pagination
