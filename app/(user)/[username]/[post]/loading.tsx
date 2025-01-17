import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Container } from "@/components/container"

const LoadingPostPage = () => {
  return (
    <Container fixed={false}>
      <section className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Left column - Main post and reply box */}
          <div className="w-full lg:w-2/5 lg:sticky lg:top-8 lg:self-start">
            <Card className="flex flex-col gap-2 border-b p-4" foreground>
              {/* Post skeleton */}
              <div className="flex gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-5 w-24" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                  </div>
                  <div className="flex gap-4 mt-4">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-16" />
                  </div>
                </div>
              </div>

              {/* Reply box skeleton */}
              <Card>
                <CardContent className="mt-5">
                  <Skeleton className="h-24 w-full rounded-lg" />
                </CardContent>
                <CardFooter>
                  <div className="flex flex-row justify-end w-full items-center gap-3">
                    <Skeleton className="h-9 w-20" />
                  </div>
                </CardFooter>
              </Card>
            </Card>
          </div>

          {/* Right column - Comments */}
          <div className="w-full lg:w-3/5 flex flex-col gap-4">
            {/* Generate 3 comment skeletons */}
            {Array.from({ length: 3 }).map((_, index) => (
              <Card key={index} className="p-4">
                <div className="flex gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="h-5 w-24" />
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                    <div className="flex gap-4 mt-4">
                      <Skeleton className="h-5 w-16" />
                      <Skeleton className="h-5 w-16" />
                      <Skeleton className="h-5 w-16" />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Container>
  )
}

export default LoadingPostPage;